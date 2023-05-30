import { Recipe } from "@prisma/client";
import Card from "@ui/Card";
import Link from "next/link";

interface Props extends React.PropsWithChildren {}

export default function RecipeLayout({ children }: Props) {
  return (
    <main>
      <Link href="/recipes">Back to recipes</Link>
      <Card>{children}</Card>
    </main>
  );
}
