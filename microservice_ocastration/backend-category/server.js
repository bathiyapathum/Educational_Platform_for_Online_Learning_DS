const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

//import db
const db = require("./lib/Db.js");

const { getProgress } = require("./lib/GetProgress.js");

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date()?.toISOString();
  const ip = req?.ip || req?.connection?.remoteAddress;
  console.log(`[${timestamp}] | ${ip} | ${req?.method} ${req?.path}`);
  next();
});


//get api for get catergories from db
app.get("/api", async (req, res) => {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.send(categories);
  } catch (error) {
    console.log(error);
  }
});

//start port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
