import * as mongoose from 'mongoose'

export interface UnStake {
    user: string;
    token: string;
    amount: number;
    contract: string;
    rewards: number;
}

const Schema = {
    user: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    contract: {
        type: String,
        required: true,
    },
    rewards: {
        type: Number,
        required: true,
    },
}

export default mongoose.model(
    'UnStakes',
    new mongoose.Schema<UnStake>(Schema, {
        timestamps: true,
    })
)
