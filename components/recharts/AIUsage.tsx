"use client";
import {
  getUserAvailableCredit,
  UserAvailableCreditResponse,
} from "@/actions/send-ai-request";
import { memo, useEffect, useState } from "react";
import AIChart from "@/components/recharts/AIChart";

const AIUsage = () => {
  const [userAiOutputs, setUserAiOutputs] =
    useState<UserAvailableCreditResponse | null>(null);
  useEffect(() => {
    getUserAvailableCredit().then((aiOutputs) => setUserAiOutputs(aiOutputs));
  }, []);
  return (
    <div className="bg-white">
      <AIChart
        availableCredit={userAiOutputs?.availableCredit || 10000}
        totalUsage={userAiOutputs?.totalUsage || 0}
      />
    </div>
  );
};

export default memo(AIUsage);
