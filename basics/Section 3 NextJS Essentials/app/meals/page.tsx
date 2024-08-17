import { Suspense } from "react";

import Link from "next/link";
import { getMeals } from "@/lib/meals";
import MealsGrid from "@/components/meals/meals-grid";

import styles from "./page.module.css";

export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibrant community.",
};

async function Meals() {
  const meals = await getMeals();
  console.log("meals --> ", meals);

  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={styles.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={styles.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </header>
      <main>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          {Meals()}
        </Suspense>
      </main>
    </>
  );
}
