import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendEmail(subject, text) {
  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    // プロパティのキーと引数の名前が同じ場合、以下のように省略できる
    subject,
    text
    // subject: subject,
    // text: text,
  };

  const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: process.env.EMAIL_FROM,
      // googleアカウントのアプリパスワードを設定
      // see https://support.google.com/accounts/answer/185833?hl=ja
      pass: process.env.APP_PASS
    }
  };

  const transporter = nodemailer.createTransport(smtpConfig);

  transporter.sendMail(message, function (err, response) {
    console.log(err || response);
  });
}

export { sendEmail };
