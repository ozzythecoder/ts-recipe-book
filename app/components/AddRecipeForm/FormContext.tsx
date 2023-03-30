"use client";

import { useEffect, useState } from "react";
import { useReducer, createContext } from "react";
import { Reducer } from "react";

import { DetailedIngredient } from "@/lib/types";
import { AddRecipeFormType } from "@/lib/types";

const initialFormState: AddRecipeFormType = {
  title: "",
  rating: "",
  prepTime: "",
  cookTime: "",
};

interface ReducerAction {
  type:
    | "update_title"
    | "update_rating"
    | "update_preptime"
    | "update_cooktime";
  payload: string;
}

const formReducer: Reducer<AddRecipeFormType, ReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "update_title":
      return { ...state, title: action.payload };
    case "update_rating":
      return { ...state, rating: action.payload };
    case "update_preptime":
      return { ...state, prepTime: action.payload };
    case "update_cooktime":
      return { ...state, cookTime: action.payload };
    default:
      throw new Error(`Action not allowed: ${action.payload}`);
  }
};

export interface FormContextTypes {
  formState: AddRecipeFormType;
  dispatch: React.Dispatch<any>;
  fetchIngredients: () => void;
  ingredientOptions: DetailedIngredient[];
  setIngredientOptions: React.Dispatch<
    React.SetStateAction<DetailedIngredient[]>
  >;
  ingredientsIn: DetailedIngredient[];
  setIngredientsIn: React.Dispatch<React.SetStateAction<DetailedIngredient[]>>;
  instructionsIn: string[];
  setInstructionsIn: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FormContext = createContext<FormContextTypes>({
  formState: initialFormState,
  dispatch: () => {},
  fetchIngredients: () => {},
  ingredientOptions: [],
  setIngredientOptions: () => {},
  ingredientsIn: [],
  setIngredientsIn: () => {},
  instructionsIn: [],
  setInstructionsIn: () => {},
});

interface Props extends React.PropsWithChildren {
  ingredientInitial: DetailedIngredient[];
}

export function Provider({ ingredientInitial, children }: Props) {
  // most of form is handled with context
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  // ingredients and instructions are handled in local state
  const [ingredientsIn, setIngredientsIn] = useState<DetailedIngredient[]>([]);
  const [instructionsIn, setInstructionsIn] = useState<string[]>(["hi"]);

  // options for ingredients to list
  const [ingredientOptions, setIngredientOptions] =
    useState<DetailedIngredient[]>(ingredientInitial);

  // if an ingredient is in the recipe, remove it from the list
  const updateIngredientOptions = () => {
    setIngredientOptions(
      ingredientInitial.filter((item) => {
        if (ingredientsIn.map((ing) => ing.id).includes(item.id)) return false;
        return true;
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

  // form state and dispatch functions are passed to context
  const formContextDefault = {
    formState,
    dispatch,
    fetchIngredients,
    ingredientOptions,
    setIngredientOptions,
    ingredientsIn,
    setIngredientsIn,
    instructionsIn,
    setInstructionsIn,
  };

  // get ingredient options on page load
  useEffect(fetchIngredients, []);
  // update ingredient options whenever the added ingredients change
  useEffect(updateIngredientOptions, [ingredientsIn]);

  // render
  return (
    <FormContext.Provider value={formContextDefault}>
      {children}
      <code>
        {JSON.stringify(formState)}
        <br />
        {JSON.stringify(ingredientsIn)}
        <br />
      </code>
    </FormContext.Provider>
  );
}
