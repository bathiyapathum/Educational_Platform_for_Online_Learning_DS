const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;

const db = require("./lib/Db.js");

const { getProgress } = require("./lib/GetProgress.js");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // we need to call next in order to proceed with the application.
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
