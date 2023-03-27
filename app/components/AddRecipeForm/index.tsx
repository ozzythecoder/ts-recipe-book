"use client";

import { useEffect, useState } from "react";

import Button from "@ui/Button";
import Input from "@ui/Input";
import Autocomplete from "@ui/Autocomplete";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";

import styles from "./style.module.css";
import IngredientAddition from "./IngredientAddition";

interface Props extends React.PropsWithChildren {
  ingredientInitial: DetailedIngredient[];
}

export default function AddRecipeForm({ ingredientInitial, children }: Props) {
  const [titleIn, setTitle] = useState<string>("");
  const [ratingIn, setRating] = useState<string>("");
  const [prepTimeIn, setPrepTime] = useState<string>("");
  const [cookTimeIn, setCookTime] = useState<string>("");
  const [ingredientsIn, setIngredientsIn] = useState<DetailedIngredient[]>([]);
  const [ingredientOptions, setIngredientOptions] =
    useState<DetailedIngredient[]>(ingredientInitial);

  const updateIngredientOptions = () => {
    setIngredientOptions(
      ingredientInitial.filter((item) => {
        if (ingredientsIn.map((ing) => ing.id).includes(item.id)) return false;
        return true;
      })
    );
  };

  const addIngredient = (newIngredient: Ingredient) => {
    setIngredientsIn([
      ...ingredientsIn,
      { ...newIngredient, amount: "0", unit: "" },
    ]);
  };

  const changeAmount = (id: string, newAmount: string) => {
    setIngredientsIn(
      ingredientsIn.map((item) => {
        return item.id === parseInt(id) ? { ...item, amount: newAmount } : item;
      })
    );
  };

  const changeUnit = (id: string, newUnit: string) => {
    setIngredientsIn(
      ingredientsIn.map((item) => {
        return item.id === parseInt(id) ? { ...item, unit: newUnit } : item;
      })
    );
  };

  const removeIngredient = (badIngredient: DetailedIngredient) => {
    setIngredientsIn(
      ingredientsIn.filter((item) => item.id !== badIngredient.id)
    );
  };

  useEffect(updateIngredientOptions, [ingredientsIn]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const recipeItem = {
      title: titleIn,
      rating: ratingIn,
      prepTime: prepTimeIn,
      cookTime: cookTimeIn,
      ingredients: ingredientsIn
    }

    await fetch("http://localhost:3000/api/recipe", {
      body: JSON.stringify(
        recipeItem
      ),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    console.log(recipeItem)
  };

  return (
    <form className={styles.flexContainer} onSubmit={handleSubmit}>
      <label htmlFor="">
        Title
        <Input
          className={styles.formItem}
          type="text"
          value={titleIn}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Rating
        <Input
          className={styles.formItem}
          type="number"
          min={0}
          max={5}
          value={ratingIn}
          onChange={(e) => setRating(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Prep Time
        <Input
          className={styles.formItem}
          type="number"
          value={prepTimeIn}
          onChange={(e) => setPrepTime(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Cook Time
        <Input
          className={styles.formItem}
          type="number"
          value={cookTimeIn}
          onChange={(e) => setCookTime(parseInt(e.target.value))}
        />
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
}
