import nodemailer from "nodemailer"

// async..await is not allowed in global scope, must use a wrapper
// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1b0c91fb5caeb6",
        pass: "a94febed0c4920"
    }
  });