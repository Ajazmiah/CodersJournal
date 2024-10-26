import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "miahajaz@gmail.com",
    pass: "zxqg qfcr nwwd wogn",
  },
});

const mailOptions = {
  from: "miahajaz@gmail.com", // sender address
  to: "miahajaz@gmail.com ", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("eerr");
  }
};

sendMail(transporter, mailOptions)
