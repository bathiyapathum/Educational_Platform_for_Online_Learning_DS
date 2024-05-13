const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const db = require("./lib/Db.js");

const { getProgress } = require("./lib/GetProgress.js");

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  // we need to call next in order to proceed with the application.
  next();
});

app.get("/api", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
