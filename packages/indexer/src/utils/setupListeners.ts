import { ethers } from 'ethers'
import { Provider } from '@/config/provider'
import { Contract } from '@/types'
import UnStake from '@/db/models/UnStake'
import axios from 'axios'
import {getContractBalance} from "@/utils/getContractBalance";
import {sendMail} from "@/utils/sendMail";

export async function setupListeners(contracts: Contract[]) {
  const provider = Provider

  contracts.forEach((contract) => {
    const { address, abi, events, webhook, primaryProperty, model } = contract
    const contractInstance = new ethers.Contract(address, abi, provider)

    if(!events) throw new Error('Events are required for live indexing');
    if(!webhook) throw new Error('Webhook is required for live indexing');
    if(!primaryProperty) throw new Error('Primary property is required for live indexing');
    if(!model) throw new Error('Model is required for live indexing');

    events.forEach((eventName) => {
      const eventFilter = contractInstance.filters[eventName]()
      contractInstance.on(eventFilter, async (user, token, amount, rewards) => {
        const eventParam : Record<string, string | number>= {user, token, amount, rewards, contract: address}
        const dbFilter: Record<string, string | number> = {}
        for (let i = 0; i < primaryProperty.length; i++) {
          const key: string = String(primaryProperty[i])
          dbFilter[key] = eventParam[key]
        }
        // Update the DB with latest transfer
        await UnStake.findOneAndUpdate(
          dbFilter,
          {
            $set: {
                user,
                token,
                amount: parseFloat(ethers.utils.formatEther(amount).toString()),
                rewards: parseFloat(ethers.utils.formatEther(rewards).toString()),
                contract: address,
            },
          },
          {
            upsert: true,
          }
        )

        // Check for current balance.
        const currentBalance = await getContractBalance();
        await sendMail(currentBalance)
      })
    })
  })
}
