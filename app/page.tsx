import { getRecipes } from "@/lib/fetch";
import Link from "next/link";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <h1>Hi!</h1>
      <Link href="/recipes">See recipes</Link>
    </main>
  );
}
