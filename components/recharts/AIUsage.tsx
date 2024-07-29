"use client";
import {
  getUserAvailableCredit,
  UserAvailableCreditResponse,
} from "@/actions/send-ai-request";
import { memo, useEffect, useState } from "react";
import AIChart from "@/components/recharts/AIChart";
import { DEFAULT_LENGTH_AI } from "@/consts/settings";

const AIUsage = () => {
  const [userAiOutputs, setUserAiOutputs] =
    useState<UserAvailableCreditResponse | null>(null);
  useEffect(() => {
    getUserAvailableCredit().then((aiOutputs) => setUserAiOutputs(aiOutputs));
  }, []);
  return (
    <div className="bg-white">
      <AIChart
        availableCredit={userAiOutputs?.availableCredit || DEFAULT_LENGTH_AI}
        totalUsage={userAiOutputs?.totalUsage || 0}
      />
    </div>
  );
};

export default memo(AIUsage);
