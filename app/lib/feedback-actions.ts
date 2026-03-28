"use server";

import { db } from "@/app/db";
import { feedback, user } from "@/app/db/schema/index";
import { redirect } from "next/navigation";
import { validateUser } from "./auth-actions";
import { desc, eq} from "drizzle-orm";
import {CategoryTypes} from '@/app/lib/types'

export type CreateFeedbackState = {
  errors?: {
    title?: string[];
    category?: string[];
    detail?: string[];
  };
  message?: string | null;
};

export async function createFeedback(
  initialState: CreateFeedbackState,
  formData: FormData,
): Promise<CreateFeedbackState> {
  const userId = await validateUser();

  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const detail = formData.get("detail") as string;

  await db.insert(feedback).values({
    userId,
    title,
    category: category as CategoryTypes,
    detail,
    status: "Suggestion", // Default status
    upvotes: 0,
  });

  redirect("/");
}

export async function getFeedbacks() {
  try {
    const userId = await validateUser();

    const feedbacks = await db
      .select({
        id: feedback.id,
        title: feedback.title,
        category: feedback.category,
        status: feedback.status,
        detail: feedback.detail,
        upvotes: feedback.upvotes,
        createdAt: feedback.createdAt,
        updatedAt: feedback.updatedAt,
      })
      .from(feedback)
      .leftJoin(user, eq(feedback.userId, userId)) // Standard join syntax
      // .where(eq(feedback.userId, userId)) // Uncomment if you only want OWN feedbacks
      .orderBy(desc(feedback.createdAt));

    return feedbacks.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of bills.");
  }
}

export async function getFeedbackDetail(id: string) {
  const data = await db.query.feedback.findFirst({
    where: eq(feedback.id, id),
  });

  if (!data) return null;

  return {
    ...data,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(), 
  };
}
