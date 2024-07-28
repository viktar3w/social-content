import { ReactNode } from "react";
import DashboardSidebar from "@/components/sidebars/DashboardSidebar";
import AIUsage from "@/components/recharts/AIUsage";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="md:w-64 hidden md:block fixed">
        <DashboardSidebar />
        <AIUsage />
      </div>
      <div className="md:ml-64 bg-gray-50 h-fit pb-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
