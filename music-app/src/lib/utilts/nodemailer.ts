import nodemailer from "nodemailer"

const serverName = process.env.EMAIL_SERVER_USER
const serverPass = process.env.EMAIL_SERVER_PASSWORD
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: serverName,
        pass: serverPass,
    }
})

