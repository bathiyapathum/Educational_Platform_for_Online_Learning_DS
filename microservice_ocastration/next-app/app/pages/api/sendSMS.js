//SMS eka weda meka use karanna epa limit ekak thiyenwa.

// import twilio from "twilio";

// export default async function handler(req, res) {
//   const accountSid = "AC08b0fbcae9e75ad8d0d79024306a1c2a";
//   const authToken = "e490009023f317063ff5c2691e371223";
//   const client = twilio(accountSid, authToken);

//   try {
//     const message = await client.messages.create({
//       body: "You've taken a significant step forward by investing in this course for your future career. Congratulations on your decision!",
//       from: "+15189630865", // Twilio phone number
//       to: "+94776048468", // Recipient's phone number
//     });

//     console.log(message.sid);
//     res.status(200).json({ message: "SMS sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to send SMS" });
//   }
// }
