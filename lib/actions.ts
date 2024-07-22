"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text: string | undefined) {
  return !text || text.trim() === "";
}

export async function shareMeal(formData: FormData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title?.toString()) ||
    isInvalidText(meal.summary?.toString()) ||
    isInvalidText(meal.instructions?.toString()) ||
    isInvalidText(meal.creator?.toString()) ||
    isInvalidText(meal.creator_email?.toString()) ||
    !meal.creator_email?.toString().includes("@") ||
    !meal.image
  ) {
    throw new Error("Invalid input");
  }

  await saveMeal(meal);
  redirect("/meals");
}
