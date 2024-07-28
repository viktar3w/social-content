"use client";
import { contentTemplates } from "@/consts/template";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GET_CATEGORY_KEY } from "@/consts/categories";

type TemplateListProps = {
  searchInput: string;
};

const TemplateList = ({ searchInput }: TemplateListProps) => {
  const [templateList, setTemplateList] = useState(contentTemplates);
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get(GET_CATEGORY_KEY);
  useEffect(() => {
    if (searchCategory === "All" || !searchCategory) {
      setTemplateList(contentTemplates);
    } else {
      const filteredTemplates = contentTemplates.filter((tmp) =>
        tmp.name.toLowerCase().includes(searchCategory.toLowerCase()),
      );
      setTemplateList(filteredTemplates);
    }
  }, [searchCategory]);
  useEffect(() => {
    if (!searchInput || searchInput.length < 2) {
      setTemplateList(contentTemplates);
      return;
    }
    const filteredTemplates = contentTemplates.filter((tmp) =>
      tmp.name.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setTemplateList(filteredTemplates);
  }, [searchInput]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-5 mt-5">
      {templateList.map((tmp) => (
        <div key={tmp.slug}>
          <Link
            href={`/dashboard/${tmp.slug}`}
            className="bg-white w-full rounded-lg h-[200px] py-4 px-4 text-center flex flex-col justify-center items-center"
          >
            {!!tmp.icon && <tmp.icon className="h-12 w-12 max-auto" />}
            <h3 className="font-semibold mt-5">{tmp.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TemplateList;
