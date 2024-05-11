//SMS eka weda meka use karanna epa limit ekak thiyenwa.

// const client = require("twilio")(
//   "AC08b0fbcae9e75ad8d0d79024306a1c2a",
//   "e490009023f317063ff5c2691e371223"
// );

// const sendSMS = async (body) => {
//   let msgOptions = {
//     from: "+15189630865", // Twilio phone number in E.164 format
//     to: "+94776048468", // Recipient's phone number in E.164 format
//     body: "You've taken a significant step forward by investing in this course for your future career. Congratulations on your decision! Remember, every lesson learned is a stepping stone towards success. Wishing you the best of luck on this educational journey and in your future endeavors", // Include the message body
//   };

//   try {
//     const message = await client.messages.create(msgOptions);
//     console.log(message.sid);
//   } catch (error) {
//     console.error(error);
//   }
// };

// sendSMS(
//   "You've taken a significant step forward by investing in this course for your future career. Congratulations on your decision! Remember, every lesson learned is a stepping stone towards success. Wishing you the best of luck on this educational journey and in your future endeavors"
// ).then(() => console.log("Message sent!"));
