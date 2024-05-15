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
app.post("/api/make-purchase", async (req, res) => {
    const { userId, courseId } = req.body;
  
    console.log("userId", userId);
    console.log("courseId", courseId);
  
    try {
      const purchase = await db.purchase.create({
        data: {
          userId,
          courseId,
        },
      });
      res.status(200).json({ message: "Purchase successful" });
    } catch (error) {
      console.error("Error making purchase:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  