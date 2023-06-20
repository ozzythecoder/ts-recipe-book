"use client";
import { useState } from "react";
import { Ingredient } from "@prisma/client";
import { Popover, PopoverTrigger, PopoverContent } from "@ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/command";
import { Button } from "@ui/button";
import { CommandList } from "cmdk";

interface Props {
  ingredients: Ingredient[];
}

const testItems = [
  { id: 4, name: "Onion" },
  { id: 6, name: "Bell Pepper" },
  { id: 8, name: "Sugar" },
];

export default function IngredientCombobox({ ingredients }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-48" type="button">
          Add ingredient
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Search ingredients..." />
          <CommandList>
            <CommandEmpty>No ingredients found. Create {value}?</CommandEmpty>
            {testItems.map((item) => (
              <CommandItem
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setOpen(false);
                }}
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
