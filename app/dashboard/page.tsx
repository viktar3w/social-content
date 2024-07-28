"use client";
import SearchDashboard from "@/components/search/SearchDashboard";
import TemplateList from "@/components/list/TemplateList";
import { useState } from "react";

const Page = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <div>
      <SearchDashboard setSearchInput={setSearchInput} />
      <TemplateList searchInput={searchInput} />
    </div>
  );
};

export default Page;
