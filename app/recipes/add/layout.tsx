import { Recipe } from "@prisma/client";
import Card from "@ui/Card";
import Link from "next/link";

interface Props extends React.PropsWithChildren {}

export default function RecipeLayout({ children }: Props) {
  return (
    <>
      <Link href="/recipes">Back to recipes</Link>
      <>{children}</>
    </>
  );
}
