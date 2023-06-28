"use client";
import { useSearchContext } from "@/lib/context/search";
import { useEffect, useRef } from "react";

const SearchField = () => {

  const inputRef = useRef<HTMLInputElement>(null)

  const { recipeSearchIn, setRecipeSearch } = useSearchContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipeSearch!(e.target.value);
  };

  // PRESS "/" TO SEARCH
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/') {
        inputRef.current?.focus();
      }
    }
    document.addEventListener('keyup', handleKeyPress)
    return () => document.removeEventListener('keyup', handleKeyPress)
  }, [])

  return (
    <input
      aria-label="Search recipes"
      ref={inputRef}
      className="p-2 w-3/5 border-2 rounded-sm"
      type="text"
      value={recipeSearchIn}
      onChange={handleChange}
      placeholder={"Search Recipes"}
    />
  );
};

export default SearchField;
