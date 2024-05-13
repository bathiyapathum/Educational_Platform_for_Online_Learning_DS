const express = require("express");
const app = express();
const PORT = process.env.PORT || 3004;

const db = require("./lib/Db.js");

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date()?.toISOString();
  const ip = req?.ip || req?.connection?.remoteAddress;
  console.log(`[${timestamp}] | ${ip} | ${req?.method} ${req?.path}`);
  next();
});

// Endpoint to create a new chapter
app.post("/api", async (req, res) => {
  const { title, courseId, position } = req.body;

  try {
    const chapter = await db.chapter.create({
      data: {
        title,
        courseId,
        position,
      },
    });

    // Send a success response with the created chapter
    res.status(201).json({ chapter });
  } catch (error) {
    console.error("Error creating chapter:", error);
    // Send an error response if something goes wrong
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
