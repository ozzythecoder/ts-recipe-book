"use client";

import Button from "@ui/Button";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";

import { Provider } from "./FormContext";

import styles from "./style.module.css";
import IngredientAutocomplete from "@/app/components/Autocomplete";

import IngredientsList from "./IngredientsList";
import InstructionsList from "./InstructionsList";

interface Props extends React.PropsWithChildren {
  ingredientInitial: DetailedIngredient[];
}

export default function AddRecipeForm({ ingredientInitial }: Props) {

  // submit recipe to DB
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const recipeItem = {};

    await fetch("http://localhost:3000/api/recipe", {
      body: JSON.stringify(recipeItem),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
  };

  const suppressEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // render
  return (
    <>
      <Provider ingredientInitial={ingredientInitial}>
        <form
          className={styles.flexContainer}
          onKeyDown={suppressEnter}
          onSubmit={handleSubmit}
        >
          <IngredientsList />

          <InstructionsList />

          <Button type="submit">Add Recipe</Button>
        </form>

        <IngredientAutocomplete />
      </Provider>
    </>
  );
}
