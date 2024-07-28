"use client";
import Logo from "@/components/Logo";
import { MENU_LIST } from "@/consts/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="p-5 bg-white flex flex-col h-[80vh]">
      <Logo />
      <div className="mt-10 h-max flex flex-col justify-between">
        {MENU_LIST.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={cn(
              "flex mb-2 gap-2 p-3 hover:bg-primary hover:text-white cursor-pointer rounded-lg items-center",
              pathname === item.path ? "text-white bg-primary" : "",
            )}
          >
            <item.icon className="h-6 w-6 " />
            <h2 className="text-lg">{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
