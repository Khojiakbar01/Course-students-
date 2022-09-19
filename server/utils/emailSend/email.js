const nodeMailer = require('nodemailer')


exports.sendVerificationMail = ({to, subject, html,verificationCode}) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xojiakbara38@gmail.com',
            pass: 'wbinjdxcrqmubtbo'
        }
    })

//pass
//wbinjdxcrqmubtbo

    const options = {
        from: 'xojiakbara38@gmail.com',
        to,
        subject,
        html:`<p>Please Verify</p>
                <button style=padding:100px>
                    <a href="http://localhost:3000/auth/verify/${verificationCode}">Verify</a>
                </button>`,

        verificationCode
    }

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return
        }
        console.log("email sent")
    })

}