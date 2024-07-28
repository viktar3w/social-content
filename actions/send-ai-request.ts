"use server";
import { chatSession } from "@/lib/gemini-ai";
import { AIOutput } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const sendAiRequest = async (request: string): Promise<string> => {
  const result = await chatSession.sendMessage(request);
  return result.response.text();
};

export const sendAiRequestTest = async (request: string): Promise<string> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve("new test string");
    }, 1500);
  });
};

export const saveInDb = async ({
  title,
  description,
  templateUsed,
}: AIOutput) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  return await db.aIOutput.create({
    data: {
      userId,
      title,
      description,
      templateUsed,
    },
  });
};

export const getUserAiOutputs = async (): Promise<AIOutput[]> => {
  const { userId } = await auth();
  if (!userId) {
    return [];
  }
  return await db.aIOutput.findMany({
    where: {
      userId: userId,
    },
  });
};

export type UserAvailableCreditResponse = {
  availableCredit: number;
  totalUsage: number;
};

export const getUserAvailableCredit =
  async (): Promise<UserAvailableCreditResponse | null> => {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }
    const aiOutputs = await db.aIOutput.findMany({
      where: {
        userId: userId,
      },
    });
    let totalUsage = 0;
    aiOutputs.forEach((aiOutput) => {
      totalUsage += Number(aiOutput.description?.length);
    });
    const userCredits = await db.user.findUnique({
      where: {
        userId,
      },
      select: {
        totalCredit: true,
      },
    });
    return {
      availableCredit: userCredits?.totalCredit || 0,
      totalUsage: totalUsage,
    };
  };
