import { Category, Course } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import axios from "axios";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    // return [
    //   {
    //     id: '4a09a81e-d73b-464a-900e-7a6f0093f176',
    //     userId: 'user_2gJQx1piLassO9ocnTvLAT4itOl',
    //     title: 'Software Development',
    //     description: 'This course about Software development',
    //     imageUrl: 'https://utfs.io/f/d16b74d5-16e1-4acc-a990-f576f289420d-6gwlfx.jpg',
    //     price: 10,
    //     isPublished: true,
    //     categoryId: '1',
    //     createdAt: new Date('2024-05-11T08:14:52.478Z'),
    //     updatedAt:  new Date('2024-05-11T08:14:52.478Z'),
    //     category: { id: '1', name: '3241' },
    //     chapters: [{ id : 'a658b91d-229c-4b46-a621-68ca964db2d0' }],
    //     // purchases: [],
    //     progress: null
    //   },
    // ]
    // const courses = await db.course.findMany({
    //   where: {
    //     isPublished: true,
    //     title: {
    //       contains: title,
    //     },
    //     categoryId
    //   },
    //   include: {
    //     category: true,
    //     chapters: {
    //       where: {
    //         isPublished: true,
    //       },
    //       select: {
    //         id: true
    //       }
    //     },
    //     purchases: {
    //       where: {
    //         userId
    //       }
    //     }
    //   },
    //   orderBy: {
    //     createdAt: "desc"
    //   }
    // });

    // const courseWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
    //   courses.map(async (course) => {
    //     if (course.purchases.length === 0) {
    //       return {
    //         ...course,
    //         progress: null
    //       }
    //     }

    //     const progressPercentage = await getProgress(
    //       userId,
    //       course.id
    //     );

    //     return {
    //       ...course,
    //       progress: progressPercentage
    //     };
    //   })
    // );

    // return courseWithProgress;

    const response = await axios.get("http://localhost:3001/api", {
      params: {
        userId: userId,
        title: title,
        categoryId: categoryId,
      },
    });

    console.log("course");

    return response.data;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};
