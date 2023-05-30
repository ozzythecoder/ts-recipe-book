"use client";
import { useSearchContext } from "@/lib/context/search";

const SearchField = () => {
  const { recipeSearchIn, setRecipeSearch } = useSearchContext();

  const handleChange = (e: React.SyntheticEvent) => {
    if (setRecipeSearch) {
      setRecipeSearch((e.target as HTMLInputElement).value);
    }
  };

  return <input type="text" value={recipeSearchIn} onChange={handleChange} />;
};

export default SearchField;
