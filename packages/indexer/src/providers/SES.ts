import AWS from 'aws-sdk';
import dotenv from "dotenv";

dotenv.config();
export const SES = () => {
    AWS.config.update({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
        region: 'ap-south-1' // replace with your AWS region
    });

    return new AWS.SES();

}