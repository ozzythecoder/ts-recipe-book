'use client';
import { useContext, createContext, useState } from "react";

// searching for recipes in list

interface ISearchContext {
  recipeSearchIn: string;
  setRecipeSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext<ISearchContext>({} as ISearchContext)

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