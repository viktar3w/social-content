"use client";
import { useState } from "react";
import { ContentTemplate } from "@/consts/template";
import { saveInDb, sendAiRequest } from "@/actions/send-ai-request";
import {AIOutput} from "@prisma/client";

export type SendMediaContentProps = {
  title: string;
  description: string;
  templateUsed: string;
};
type AiGenerationProps = {
  aiPrompt: ContentTemplate["aiPrompt"];
};

const useAiGeneration = ({ aiPrompt }: AiGenerationProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [aiOutput, setAIOutput] = useState<string>("");
  const onSubmit = async ({
    title,
    description,
    templateUsed,
  }: SendMediaContentProps) => {
    setIsLoading(true);
    setAIOutput("");
    try {
      let dataSet = {
        title,
        description,
      };
      const finalAIPrompt = JSON.stringify(dataSet) + ", " + aiPrompt;
      const result = await sendAiRequest(finalAIPrompt);
      await saveInDb({
        title,
        description: result,
        templateUsed,
      } as AIOutput);
      setAIOutput(result);
      setIsLoading(false);
    } catch (e: any) {
      console.log("[ERROR] ", e);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    aiOutput,
    onSubmit,
  };
};

export default useAiGeneration;
