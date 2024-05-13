const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;

const db = require("./lib/Db.js");

const { getProgress } = require("./lib/GetProgress.js");

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date()?.toISOString();
  const ip = req?.ip || req?.connection?.remoteAddress;
  console.log(`[${timestamp}] | ${ip} | ${req?.method} ${req?.path}`);
  next();
});

app.get("/api", async (req, res) => {
  const { userId, courseId } = req.query;

  console.log("userId", userId);
  console.log("courseId", courseId);

  console.log("chapter");
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  console.log("purchase", purchase);

  res.send(purchase);
});

//make course purchased
