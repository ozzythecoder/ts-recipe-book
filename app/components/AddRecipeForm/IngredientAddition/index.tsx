import { useContext } from "react";
import Input from "@ui/Input";
import Button from "@ui/Button";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";
import { FormContext } from "../FormContext";

interface Props extends React.PropsWithChildren {
  ingredient: DetailedIngredient;
}

export default function IngredientAddition({ ingredient }: Props) {

  const { setIngredientsIn, ingredientsIn } = useContext(FormContext)

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

  return (
    <li>
      <Input type='number' min={0} max={10000} value={ingredient.amount} onChange={(e) => changeAmount(ingredient.id.toString(), e.target.value)} />
      <Input type='text' value={ingredient.unit} onChange={(e) => changeUnit(ingredient.id.toString(), e.target.value)} />
      {ingredient.name}
      <Button
        onClick={(e) => {e.preventDefault(); deleteIngredient(ingredient)}}
      >
        -
      </Button>
    </li>
  )
}