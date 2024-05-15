const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const twilio = require("twilio");
const nodemailer = require("nodemailer");
const { Vonage } = require('@vonage/server-sdk');
const db = require("./lib/Db.js");

const { getProgress } = require("./lib/GetProgress.js");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const timestamp = new Date()?.toISOString();
  const ip = req?.ip || req?.connection?.remoteAddress;
  console.log(`[${timestamp}] | ${ip} | ${req?.method} ${req?.path}`);
  next();
});


const accountSid = "AC08b0fbcae9e75ad8d0d79024306a1c2a";
const authToken = "e490009023f317063ff5c2691e371223";
const client = twilio(accountSid, authToken);

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

const vonage = new Vonage({
  apiKey: "7a829464",
  apiSecret: "fmCSyzn6XtYXZjtX"
});
const from = "Vonage APIs"
const to = "94776048468"
const text = "You've taken a significant step forward by investing in this course for your future career. Congratulations on your decision!"

async function sendSMSS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}


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


app.post("/api/sendEmail", async(req,res) =>{
  try {
    console.log("hai dilan")
    // Send SMS and Email
    // const [smsMessage, emailInfo] = await Promise.all([sendSMS(), sendEmail()]);
    const [smsMessage, emailInfo] = await Promise.all([ sendSMSS(),sendEmail()]);

    res.status(200).json({ smsMessage, emailInfo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

app.get("/api/course", async (req, res) => {
  const { userId, title, categoryId } = req.query;

  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPercentage = await getProgress(userId, course.id);

        return {
          ...course,
          progress: progressPercentage,
        };
      })
    );

    res.send(courseWithProgress);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/course/user/:id", async (req, res) => {
  const userId = req.params.id;

  console.log(userId);

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    const courses = await db.course.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.send(courses);
    console.log(courses);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});