"use client";

import { useEffect, useState } from "react";
import { useReducer, useContext, createContext } from "react";

import Button from "@ui/Button";
import UList from "@ui/UList";

import { DetailedIngredient } from "@/lib/types";
import { AddRecipeFormType } from "@/lib/types";

import styles from "./style.module.css";
import Autocomplete from "@/app/components/Autocomplete";
import IngredientAddition from "./IngredientAddition";
import Input from "../ui/Input";
import { Ingredient } from "@prisma/client";



const initialFormState: AddRecipeFormType = {
  title: "",
  rating: "",
  prepTime: "",
  cookTime: "",
  instructions: [],
};

const formReducer = (state, action) => {
  // @ts-ignore
  return {
    'update_title': { ...state, title: action.payload },
    'update_rating': { ...state, rating: action.payload },
    'update_preptime': { ...state, prepTime: action.payload },
    'update_cooktime': { ...state, cookTime: action.payload },
    'update_instructions': { ...state, instructions: action.payload }
  }[action.type] ?? state;
};

const FormContext = createContext(null);

interface Props extends React.PropsWithChildren {
  ingredientInitial: DetailedIngredient[];
}

export default function AddRecipeForm({ ingredientInitial }: Props) {

  // most of form is handled with context
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // ingredients and instructions are handled in local state
  const [ingredientsIn, setIngredientsIn] = useState<DetailedIngredient[]>([]);
  const [instructionsIn, setInstructionsIn] = useState<string[]>([]);

  // options for ingredients to list
  const [ingredientOptions, setIngredientOptions] = useState<DetailedIngredient[]>(ingredientInitial);

  // reducer functions
  const updateTitle = (titleIn: string) => {
    dispatch({ type: "update_title", payload: titleIn });
  };

  const updateRating = (ratingIn: string) => {
    dispatch({ type: "update_rating", payload: ratingIn })
  }

  const updatePrepTime = (pTimeIn: string) => {
    dispatch({ type: "update_preptime", payload: pTimeIn })
  }

  const updateCookTime = (cTimeIn: string) => {
    dispatch({ type: "update_cooktime", payload: cTimeIn })
  }

  // form state and dispatch functions are passed to context
  const formContextDefault = {
    formState,
    updateTitle,
    updateRating,
    updatePrepTime,
    updateCookTime,
  }

  // if an ingredient is in the recipe, remove it from the list
  const updateIngredientOptions = () => {
    setIngredientOptions(
      ingredientInitial.filter((item) => {
        if (ingredientsIn.map((ing) => ing.id).includes(item.id)) return false;
        return true;
      })
    );
  };

  const addIngredient = (ingredient: Ingredient) => {
    setIngredientsIn(
      [
        ...ingredientsIn,
        { ...ingredient, amount: "0", unit: "" }
      ]
    )
  }

  const deleteIngredient = (ingredient: Ingredient) => {
    setIngredientsIn(
      ingredientsIn.filter((item) => item.id !== ingredient.id)
    )
  }

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

  const fetchIngredients = () => {
    (async () => {
      const dbRes = await fetch("http://localhost:3000/api/ingredient", {
        cache: "no-cache",
      });
      const ingrData = await dbRes.json();
      setIngredientOptions(ingrData);
    })();
  };

  // get ingredient options on page load
  useEffect(fetchIngredients, []);
  // update ingredient options whenever the added ingredients change
  useEffect(updateIngredientOptions, [ingredientsIn]);

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

  const IngredientsList = () => {
    return ingredientsIn ? (
      <UList>
        {ingredientsIn.map((item) => (
          <IngredientAddition
            key={item.id}
            ingredient={item}
            remove={deleteIngredient}
            changeAmount={changeAmount}
            changeUnit={changeUnit}
          />
        ))}
      </UList>
    ) : null;
  };

  const InstructionsList = () => {
    return instructionsIn ? (
      <ol>
        {instructionsIn.map((item, idx) => (
          <li key={idx}>
            {idx + 1}. {item}
          </li>
        ))}
      </ol>
    ) : null;
  };

  // render
  return (
    <>
      <FormContext.Provider
        value={formContextDefault}
      >
        <form
          className={styles.flexContainer}
          onKeyDown={suppressEnter}
          onSubmit={handleSubmit}
        >

          <label htmlFor="">
            Ingredients
            <IngredientsList />
          </label>

          <label htmlFor="">
            Instructions
            <InstructionsList />
            {instructionsIn.length + 1}.
            {/*
            //TODO textarea component
          */}
          </label>

          <Button type="submit">Add Recipe</Button>
        </form>

        <Autocomplete
          options={ingredientOptions}
          addIngredient={addIngredient}
          fetchIngredients={fetchIngredients}
        />
        <code>
        {JSON.stringify(formState)}<br />
        {JSON.stringify(ingredientsIn)}<br />
        </code>
      </FormContext.Provider>
    </>
  );
}