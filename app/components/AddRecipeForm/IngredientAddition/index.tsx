import { useState } from "react"
import Button from "@ui/Button";

import { DetailedIngredient } from "@/lib/types";

interface Props extends React.PropsWithChildren {
  ingredient: DetailedIngredient;
  remove: (ingredient: DetailedIngredient) => void;
  changeAmount: (id: string, newAmount: string) => void;
  changeUnit: (id: string, newUnit: string) => void;
}

export default function IngredientAddition({ ingredient, remove, changeAmount, changeUnit }: Props) {

  return (
    <li>
      <input type='number' min={0} max={10000} value={ingredient.amount} onChange={(e) => changeAmount(ingredient.id.toString(), e.target.value)} />
      <input type='text' value={ingredient.unit} onChange={(e) => changeUnit(ingredient.id.toString(), e.target.value)} />
      {ingredient.name}
      <Button
        onClick={(e) => {e.preventDefault(); remove(ingredient)}}
      >
        -
      </Button>
    </li>
  )
}