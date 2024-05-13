const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;

const db = require("./lib/Db.js");

const { getProgress } = require("./lib/GetProgress.js");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // we need to call next in order to proceed with the application.
  next();
});

app.get("/api", async (req, res) => {
  res.send([{ id: "005", name: "Hotel Management" },{ id: "003", name: "music" }]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
