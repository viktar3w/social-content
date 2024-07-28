"use client";
import { SearchIcon } from "lucide-react";
import Auth from "@/components/Auth";
import { Dispatch, SetStateAction } from "react";
import CategoryWrapper from "@/components/categories/CategoryWrapper";
import { categories } from "@/consts/categories";

type SearchDashboardProps = {
  setSearchInput: Dispatch<SetStateAction<string>>;
};

const SearchDashboard = ({ setSearchInput }: SearchDashboardProps) => {
  return (
    <div className="mx-5 py-2">
      <div className="flex md:flex-row gap-2 mt-5 py-6 px-4 bg-white rounded">
        <div className="flex gap-2 items-center p-2 border rounded-full bg-white w-full md:w-[20%] cursor-pointer">
          <SearchIcon className="h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-black"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <CategoryWrapper items={categories} />
        <div className="ml-auto">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default SearchDashboard;
