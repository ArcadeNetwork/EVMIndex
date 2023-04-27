import {SES} from "@/providers/SES";

export const sendMail = async (currentBalance: string | number) => {
    const emailParams = {
        Destination: { ToAddresses: ['hello@arcadenet.io', 'chinka@arcadenet.io'] },
        Message: {
            Body: { Text: { Data: `The balance of $ARC Tokens in the LP Staking contract is currently low, kindly consider adding more. Current balance is ${currentBalance}` } },
            Subject: { Data: 'URGENT: Low $ARC Token Balance in LP Staking Contract' },
        },
        Source: 'pavan.kumar@nonceblox.com',
    };

    const ses = SES();

    return ses.sendEmail(emailParams).promise();
}
