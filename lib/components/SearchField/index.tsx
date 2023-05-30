"use client";
import { useSearchContext } from "@/lib/context/search";

const SearchField = () => {
  const { recipeSearchIn, setRecipeSearch } = useSearchContext();

  const inputStyle: React.CSSProperties = {
    padding: '5px',
    fontFamily: 'inherit',
    fontSize: 'inherit'
  }

  const handleChange = (e: React.SyntheticEvent) => {
    if (setRecipeSearch) {
      setRecipeSearch((e.target as HTMLInputElement).value);
    }
  };

  return <input style={inputStyle} type="text" value={recipeSearchIn} onChange={handleChange} placeholder={"Search..."} />;
};

export default SearchField;
