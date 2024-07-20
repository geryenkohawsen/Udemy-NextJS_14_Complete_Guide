import Image from "next/image";
import { getMeal } from "@/lib/meals";

import styles from "./page.module.css";
import { notFound } from "next/navigation";

interface Recipe {
  title: string;
  slug: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
}

export default function MealDetailsPage({
  params,
}: {
  params: { mealSlug: string };
}) {
  const meal = getMeal(params.mealSlug) as Recipe;

  if (!meal) {
    notFound();
  }

  // Replace line break with  line break element
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
