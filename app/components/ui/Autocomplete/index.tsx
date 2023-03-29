import { useEffect, useState, useContext } from "react";
import { NewRecipeContext } from "@/lib/context";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";

import Button from "../Button";
import UList from "../UList";

interface Props extends React.PropsWithChildren {
  options: (Ingredient | DetailedIngredient)[];
  addIngredient: (newIngredient: Ingredient) => void;
  fetchIngredients: () => void;
}

export default function Autocomplete({
  options,
  addIngredient,
  fetchIngredients,
}: Props) {

  const recipe = useContext(NewRecipeContext)
  console.log(recipe)

  const [inputValue, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Ingredient[]>(options);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    var reg = new RegExp(e.target.value, "gi");
    setSuggestions(options.filter((item) => reg.test(item.name)));
  };

  // Add a new ingredient to the database and to the recipe
  const handleNewIngredient = async (e?: React.SyntheticEvent) => {
    e?.preventDefault();

    // Check if ingredient already exists
    const duplicateIngredient = options.find(
      (item) => item.name.toLowerCase() === inputValue.toLowerCase()
    );

    // if input is blank, reject.
    if (inputValue.length === 0) {
      console.log("Please enter a valid name for the ingredient.");
      return;
    }
    // if ingredient already exists, add the existing option
    else if (duplicateIngredient) {
      addIngredient(duplicateIngredient);
    } else {
      // add to the databse
      await fetch("http://localhost:3000/api/ingredient", {
        method: "POST",
        body: JSON.stringify({
          name: inputValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchIngredients();
      console.log(options);
      const newIngredient = options.find((item) => item.name === inputValue);
      newIngredient
        ? addIngredient(newIngredient)
        : console.error("Failed to add ingredient; result was undefined");
    }
  };

  useEffect(() => {
    setSuggestions(options);
  }, [options]);

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {suggestions ? (
        <UList>
          {suggestions.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  callback(item);
                }}
              >
                +
              </Button>
            </li>
          ))}
        </UList>
      ) : null}
    </>
  );
}
