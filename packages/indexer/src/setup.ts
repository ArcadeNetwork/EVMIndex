import {Contract} from "@/types";
import UnStake from "@/db/models/UnStake";
type Setup = {
    contracts: Contract[]
}
export const setup: Setup = {
  contracts: [
    {
      name: 'Arcade LP Staking Contract',
      address: '0xe187DbCDF8673B5ed3F180F4b579a9D9DE421a40',
      startBlock: 29012760,
      abi: [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "rewards",
              "type": "uint256"
            }
          ],
          "name": "UnStaked",
          "type": "event"
        },
      ],
      events: ['UnStaked'],
      model: UnStake,
      primaryProperty: ["user", "contract"],
      topic: 'UnStaked(address,address,uint256,uint256)',
      webhook: 'https://webhook.site/ffc6015b-ff0b-47e9-a47f-ffcf5c79b8c4',
    },
  ],
}
