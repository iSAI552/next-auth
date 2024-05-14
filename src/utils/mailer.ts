import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOptions = {
      from: 'wow@wowwow.in',
      to: email,
      subject: emailType ==="Verify" ? "Verify your email": "Reset Your Password",
      html: "<b>Hello world?</b>",
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse

  } catch (error:any) {
    throw new Error(error.message)
  }
};
