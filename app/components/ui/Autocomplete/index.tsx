import { useEffect, useState } from "react";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";
import Button from "../Button";


interface Props extends React.PropsWithChildren {
  options: (Ingredient | DetailedIngredient)[];
  callback: (newIngredient: Ingredient) => void;
}

export default function Autocomplete({ options, callback }: Props) {
  const [inputValue, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Ingredient[]>(options);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    var reg = new RegExp(e.target.value, "gi");
    setSuggestions(options.filter((item) => reg.test(item.name)));
  };

  useEffect(() => {setSuggestions(options)}, [options])

  return (
    <>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      {suggestions ? (
        <ul>
          {suggestions.map((item) => (
            <li key={item.id}>{item.name}
            <Button
              onClick={(e) => { e.preventDefault(); callback(item) }}
            >
              +
            </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
