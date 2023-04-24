'use client';
import { useContext, createContext, useState } from "react";

// searching for recipes in list

const SearchContext = createContext<{
  recipeSearchIn?: string;
  setRecipeSearch?: React.Dispatch<React.SetStateAction<string>>
}>({})

interface Props extends React.PropsWithChildren {}

export const SearchContextProvider = ({ children }: Props) => {

  const [ recipeSearchIn, setRecipeSearch ] = useState<string>("");

  return (
    <SearchContext.Provider value={{ recipeSearchIn, setRecipeSearch }}>
      { children }
    </SearchContext.Provider>
  )
}

export const useSearchContext = () => useContext(SearchContext);