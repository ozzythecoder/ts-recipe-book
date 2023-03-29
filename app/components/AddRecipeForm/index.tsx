"use client";

import { useEffect, useState } from "react";
import { useReducer, useContext, createContext } from "react";

import Button from "@ui/Button";
import UList from "@ui/UList";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";
import { AddRecipeFormType } from "@/lib/types";

import styles from "./style.module.css";
import Autocomplete from "@/app/components/Autocomplete";
import IngredientAddition from "./IngredientAddition";
import Input from "../ui/Input";

interface Props extends React.PropsWithChildren {
  ingredientInitial: DetailedIngredient[];
}

const initialFormState: AddRecipeFormType = {
  title: "",
  rating: "",
  prepTime: "",
  cookTime: "",
  ingredients: [],
  instructions: [],
};

const formReducer = (state, action) => {
  return {
    'update_title': { ...state, title: action.payload },
    'update_rating': { ...state, rating: action.payload },
    'update_preptime': { ...state, prepTime: action.payload },
    'update_cooktime': { ...state, cookTime: action.payload },
    'update_ingredients': { ...state, ingredients: action.payload },
    'update_instructions': { ...state, instructions: action.payload }
  }[action.type] ?? state;
};

const FormContext = createContext(null);

export default function AddRecipeForm({ ingredientInitial, children }: Props) {

  const [ingredientsIn, setIngredientsIn] = useState<DetailedIngredient[]>([]);
  const [ingredientOptions, setIngredientOptions] =
    useState<DetailedIngredient[]>(ingredientInitial);
  const [instructionsIn, setInstructionsIn] = useState<string[]>([]);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  
  const updateTitle = (titleIn: string) => {
    dispatch({ type: "update_title", payload: titleIn });
  };

  const updateIngredients = (ingredientIn: Ingredient) => {
    const ingredientWithDetails = {
      ...ingredientIn,
      amount: "0",
      unit: ""
    }

    dispatch({ type: "update_ingredients", payload: [ ...formState.ingredients, ingredientWithDetails ] })
  }

  const deleteIngredient = (ingredientOut: Ingredient) => {
    dispatch({ type: "update_ingredients", payload: formState.ingredients.filter((item) => item.id !== ingredientOut.id) })
  }

  const formContextDefault = {
    formState,
    updateTitle,
    updateIngredients,
    deleteIngredient
  }

  const updateIngredientOptions = () => {
    setIngredientOptions(
      ingredientInitial.filter((item) => {
        if (formState.ingredients.map((ing) => ing.id).includes(item.id)) return false;
        return true;
      })
    );
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

  const fetchIngredients = () => {
    (async () => {
      const dbRes = await fetch("http://localhost:3000/api/ingredient", {
        cache: "no-cache",
      });
      const ingrData = await dbRes.json();
      setIngredientOptions(ingrData);
    })();
  };

  useEffect(fetchIngredients, []);
  // update remaining options whenever the added ingredients change
  useEffect(updateIngredientOptions, [formState.ingredients]);

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
    return formState.ingredients ? (
      <UList>
        {formState.ingredients.map((item) => (
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
          <TitleField />

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
          addIngredient={updateIngredients}
          fetchIngredients={fetchIngredients}
        />
        <code>
        {JSON.stringify(formState)}<br />
        </code>
      </FormContext.Provider>
    </>
  );
}

const TitleField = () => {
  const { formState, updateTitle } = useContext(FormContext);

  const handleChange = (e) => {
    updateTitle(e.target.value);
  };

  return <Input type="text" value={formState.title} onChange={handleChange} />;
};
