const nodemailer = require('nodemailer');

let send = {
    requstId:1,
    UserMail:'ebubbwo@mailto.plus',
    phone:'79221877570',
    text:'тестовая инфа',
    textName: 'tests',
    sms: true,
    email: true,
}

function sendSmsAndMail () {
    if (send.email === true) {
        const transporter = nodemailer.createTransport({
            host:   'smtp.yandex.ru',
            port:   465,
            secure: true, // true for 465, false for other ports
            auth:   {
                user: process.env.PROGRAMMER_EMAIL,
                pass: process.env.PROGRAMMER_PASS,
            },
        });
    }
}