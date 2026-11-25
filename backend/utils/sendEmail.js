import nodemailer from "nodemailer";

export const sendInquiryEmail = async (inquiry) => {

  try {

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",

      port: 465,

      secure: true,

      auth: {

        user: String(process.env.EMAIL_USER).trim(),

        pass: String(process.env.EMAIL_PASS).trim()

      }

    });

    console.log("EMAIL USER:", process.env.EMAIL_USER);
    console.log("PASSWORD LENGTH:", process.env.EMAIL_PASS?.length);

    const info =
      await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: "New Wedding Inquiry",

        text: `

Name: ${inquiry.name}

Email: ${inquiry.email}

Message: ${inquiry.message}

        `

      });

    console.log(
      "EMAIL SENT:",
      info.messageId
    );

  } catch (error) {

    console.error(
      "FULL EMAIL ERROR:"
    );

    console.error(error);

    throw error;

  }

};