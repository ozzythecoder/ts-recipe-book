"use client"
import { Recipe } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface Props extends React.PropsWithChildren {}

export default function RecipeSearch(props: Props) {
  const [recipeIntIn, setRecipeInt] = useState<string>();

  return (
    <>
      {props.children}
    </>
  );
}