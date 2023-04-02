import { useEffect, useState, useContext } from "react";

import { Ingredient } from "@prisma/client";

import Input from "@ui/Input";
import Card from "@ui/Card"
import Button from "@ui/Button";
import UList from "@ui/UList";
import { FormContext } from "../AddRecipeForm/FormContext";

interface Props extends React.PropsWithChildren {}

export default function Autocomplete({}: Props) {
  const {
    ingredientOptions: options,
    fetchIngredients,
    ingredientsIn,
    setIngredientsIn,
  } = useContext(FormContext);

  const [inputValue, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Ingredient[]>(options);

  const addIngredient = (ingredient: Ingredient) => {
    setIngredientsIn([
      ...ingredientsIn,
      { ...ingredient, amount: "0", unit: "" },
    ]);
  };

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
      // ingredient is new; add it to the database
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          width: "300px",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <h3>Add Ingredients</h3>
        <form action="">
          <span>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button onClick={handleNewIngredient}>+</Button>
          </span>
        </form>
        <Card
          style={{
            height: "12rem",
            overflowY: "scroll",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "0.5rem",
            width: "300px"
          }}
        >
          {suggestions ? (
            <UList>
              {suggestions.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      addIngredient(item);
                    }}
                  >
                    +
                  </Button>
                </li>
              ))}
            </UList>
          ) : (
            "Loading..."
          )}
        </Card>
      </div>
    </>
  );
}
