import { CreditCard, History, WandSparkles } from "lucide-react";

export const MENU_LIST = [
  {
    name: "Social Content",
    icon: WandSparkles,
    path: "/dashboard",
  },
  {
    name: "Output History",
    icon: History,
    path: "/dashboard/history",
  },
  {
    name: "Upgrade",
    icon: CreditCard,
    path: "/dashboard/upgrade",
  },
] as const;
