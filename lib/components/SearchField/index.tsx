"use client";
import { useSearchContext } from "@/lib/context/search";

const SearchField = () => {
  const { recipeSearchIn, setRecipeSearch } = useSearchContext();

  const handleChange = (e: React.SyntheticEvent) => {
    setRecipeSearch!((e.target as HTMLInputElement).value);
  };

  return (
    <input
      className="p-2"
      type="text"
      value={recipeSearchIn}
      onChange={handleChange}
      placeholder={"Search..."}
    />
  );
};

export default SearchField;
