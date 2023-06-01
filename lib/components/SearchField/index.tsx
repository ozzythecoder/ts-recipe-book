"use client";
import { useSearchContext } from "@/lib/context/search";

const SearchField = () => {
  const { recipeSearchIn, setRecipeSearch } = useSearchContext();

  const handleChange = (e: React.SyntheticEvent) => {
    setRecipeSearch!((e.target as HTMLInputElement).value);
  };

  return (
    <input
      className="p-2 my-2 border-2 rounded-sm"
      type="text"
      value={recipeSearchIn}
      onChange={handleChange}
      placeholder={"Search Recipes"}
    />
  );
};

export default SearchField;
