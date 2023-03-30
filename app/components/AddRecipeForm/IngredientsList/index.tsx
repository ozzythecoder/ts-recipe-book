import { useContext } from "react";

import { FormContext } from "../FormContext";
import UList from "@ui/UList";
import IngredientAddition from "../IngredientAddition";

export default function IngredientsList() {

  const { ingredientsIn } = useContext(FormContext)

  return ingredientsIn ? (
    <UList>
      {ingredientsIn.map((item) => (
        <IngredientAddition
          key={item.id}
          ingredient={item}
        />
      ))}
    </UList>
  ) : null;
};