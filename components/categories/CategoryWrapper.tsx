import type { CategoryItem } from "@/types/category";
import Category from "@/components/categories/CategoryItem";

type CategoryWrapperProps = {
  items: CategoryItem[];
};
const CategoryWrapper = ({ items }: CategoryWrapperProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Category key={item.value} category={item} />
      ))}
    </div>
  );
};

export default CategoryWrapper;
