import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import axios from "axios";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  try {
    if (!userId) {
      return redirect("/");
    }

    //TODO: Create backend to get categories
    const categories = await axios.get("http://categoryservice:3002/api");

    // const categories = await db.category.findMany({
    //   orderBy: {
    //     name: "asc",
    //   }
    // })

    console.log(categories.data);

    const courses = await getCourses({
      userId,
      ...searchParams,
    });

    return (
      <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <div className="p-6 space-y-4">
          <Categories items={categories.data} />
          <CoursesList items={courses} />
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
};

export default SearchPage;
