const nodemailer = require('nodemailer');
const axios = require('axios')
require( 'dotenv' ).config();
const transporter = nodemailer.createTransport({
    host:   'smtp.yandex.ru',
    port:   465,
    secure: true, // true for 465, false for other ports
    auth:   {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
});
async function sendSmsAndMail () {
    try{
        const request = await axios.get('http://127.0.0.1:3000/request')
        console.log(request.data.message);
        if(Array.isArray(request.data.message) && request.data.message.length > 0){
            const requests = request.data.message
            
            for (const item of requests) {
                const messageText = item.messageText
                const messageTitle = item.messageTitle
                const isSms = item.isSms
                const isEmail = item.isEmail
                const userEmail = item.userEmail
                const userPhone = item.userPhone
                
                if (isEmail) {
                    const emailObject = {
                        subject: messageTitle,
                        from: '"ООО ДОРОГИ УРАЛА" <snowflakeXXXX@yandex.ru>',
                        to: userEmail,
                        html: messageText
                    }
                    await transporter.sendMail(emailObject)
                }
                
                if (isSms) {
                    // await axios.get('https://sms.ru/sms/send?api_id=' + process.env.SMS_ID + '&to=' + userPhone + '&msg=' + messageTitle + '&json=1&from=evraz');
                }
            }
        }
        else{
            console.log(`Сообщений нет.`);
        }
    }
    catch (e) {
        console.log(e);
    }
}

setInterval(sendSmsAndMail, 3000);
