import nodeMailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodeMailer.createTransport({  //const transporter = nodeMailer.createTransport
        // Yahan tum email send karne ka engine setup kar rahe ho
// transporter = email delivery system

            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        }); 

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };  
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }   
};

export default sendEmail;