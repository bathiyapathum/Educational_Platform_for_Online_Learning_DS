// SMS eka weda meka use karanna epa limit ekak thiyenwa.sms eka send wena nawaththala thiyenne line 8 comment karala.
// meka node .\sendSMS.js kyl run karanna puluwan.ethkota mail eka withrak denata weda.line 8 uncomment karala run karoth sms eka yanwa.
//eth eka karanna epa kepenwa.sms eke podi awlk hadannath thiyenawa.

const twilio = require("twilio");
const nodemailer = require("nodemailer");

const accountSid = "AC08b0fbcae9e75ad8d0d79024306a1c2a";
const authToken = "e490009023f317063ff5c2691e371223";
// const client = twilio(accountSid, authToken);

const sendSMS = async () => {
  const msgOptions = {
    from: "+15189630865", // Twilio phone number in E.164 format
    to: "+94776048468", // Recipient's phone number in E.164 format
    body: "You've taken a significant step forward by investing in this course for your future career. Congratulations on your decision!", // Include the message body
  };

  try {
    const message = await client.messages.create(msgOptions);
    console.log("SMS SID:", message.sid);
    return "SMS sent successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send SMS");
  }
};

const sendEmail = async () => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dilanshanuka999@gmail.com", // Your Gmail address
      pass: "huic jwfb ojzz seha", // Your Gmail password
    },
  });

  // Define email options
  const mailOptions = {
    from: "dilanshanuka999@gmail.com",
    to: "hellomotivation99@gmail.com",
    subject: "Congratulations",
    text: "You've taken a significant step forward by investing in this course for your future career. Congratulations on your decision!",
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email ID:", info.messageId);
    return "Email sent successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

// Send SMS and Email
Promise.all([sendSMS(), sendEmail()])
  .then(([smsMessage, emailInfo]) => {
    console.log(smsMessage);
    console.log(emailInfo);
  })
  .catch((error) => {
    console.error(error.message);
  });
