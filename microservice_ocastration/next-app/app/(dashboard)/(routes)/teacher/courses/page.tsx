import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import axios from "axios";

const CoursesPage = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }

    // const courses2 = await db.course.findMany({
    //   where: {
    //     userId,
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });

    // console.log({ "[Course-data2]": courses2 });

    const response = await axios.get(
      `http://courseservice:3001/api/course/user/${userId}`
    );

    const courses = response.data;

    console.log({ "[Course-data]": courses });

    return (
      <div className="p-6">
        <DataTable columns={columns} data={courses} />
      </div>
    );
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return (
      <div className="p-6">
        <DataTable columns={columns} data={[]} />
      </div>
    );
  }
};

export default CoursesPage;
