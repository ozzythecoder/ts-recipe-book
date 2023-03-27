import { useEffect, useState } from "react";

import { Ingredient } from "@prisma/client";
import { DetailedIngredient } from "@/lib/types";

import Button from "../Button";
import UList from "../UList";

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
