import {ethers} from "ethers";
import {Provider} from "@/config/provider";

export const getContractBalance = async () => {
    const abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]

    const LPStaking = '0x7b8eeffEB9b1AbF06fdDCE98Eed1b49B1C724Ad0'
    const ArcToken = new ethers.Contract('0x3Fb2Adf906030a5BebDBf9EF42AAD978151a2676', abi, Provider)
    const balance = await ArcToken.balanceOf(LPStaking);
    return parseFloat(ethers.utils.formatEther(balance).toString())
}