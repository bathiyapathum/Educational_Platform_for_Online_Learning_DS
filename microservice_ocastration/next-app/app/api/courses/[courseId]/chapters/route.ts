import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const response = await axios.post("http://chapterservice:3004/api", {
      title,
      courseId: params.courseId,
      position: newPosition,
    });

    // Return the response from the backend server
    return new NextResponse(response.data, {
      status: response.status,
    });
  } catch (error) {
    console.log("[CHAPTERS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
