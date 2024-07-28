"use client";
import type { CategoryItem } from "@/types/category";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { GET_CATEGORY_KEY } from "@/consts/categories";

type CategoryItemProps = {
  category: CategoryItem;
};
const CategoryItem = ({ category }: CategoryItemProps) => {
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get(GET_CATEGORY_KEY);
  const isSelected = currentCategory === category.value;
  const handleOnClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isSelected ? null : category.value,
        },
      },
      {
        skipNull: true,
        skipEmptyString: true,
      },
    );
    push(url);
  };
  return (
    <button
      onClick={handleOnClick}
      className={cn(
        "py-2 px-4 text-sm border rounded-full flex items-center cursor-pointer",
          isSelected ? "text-white bg-primary": ""
      )}
    >
      {category.name}
    </button>
  );
};

export default CategoryItem;
