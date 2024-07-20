import MealItem from "./meal-item";
import styles from "./meals-grid.module.css";

interface Props {
  meals: {
    id: string;
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
  }[];
}

export default function MealsGrid({ meals }: Props) {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
