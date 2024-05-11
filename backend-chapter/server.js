const express = require("express");
const app = express();
const PORT = process.env.PORT || 3004;

const db = require("./lib/Db.js");

app.use(express.json());

// Endpoint to check if the user owns the course
app.post("/api", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Assuming you have a function in your Db module to check if the user owns the course
    const isCourseOwner = await db.checkCourseOwnership(userId, courseId);

    // You can modify this response as per your data structure
    res.json({ isCourseOwner });
  } catch (error) {
    console.error("Error checking course ownership:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Other endpoints and server setup can follow here

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
