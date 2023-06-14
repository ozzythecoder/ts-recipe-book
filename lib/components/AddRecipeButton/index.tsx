"use client";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";

interface Props extends React.PropsWithChildren {}

export default function AddRecipeButton({}: Props) {

  const router = useRouter();

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push('/recipes/add');
  }

  return <Button onClick={handleClick}>Add Recipe</Button>;
}
