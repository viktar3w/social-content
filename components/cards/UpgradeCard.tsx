"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpgradeCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const handleOnClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/stripe/upgrade/checkout");
      if (response?.data?.url) {
        push(response?.data?.url);
      } else {
        setIsLoading(false);
        console.log("Something was wrong");
      }
    } catch(err: any) {
      console.log("[ERROR] ", err)
      setIsLoading(false);
    }
  };
  return (
    <Card className="w-[350px] flex flex-col mx-auto">
      <CardHeader>
        <CardTitle>$10 One-Time Purchase</CardTitle>
        <CardDescription>10,000 AI Credit</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="flex my-2 gap-2">
            <Check /> 10,000 words/purchase
          </p>
          <p className="flex my-2 gap-2">
            <Check /> All Template Access
          </p>
          <p className="flex my-2 gap-2">
            <Check /> Retain All History
          </p>
        </div>
        <Button className="mt-5" onClick={handleOnClick} disabled={isLoading}>
          Purchase
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpgradeCard;
