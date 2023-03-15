import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(request);
  const recipeId = parseInt(params.id)
  const recipe = await db.recipe.findUnique({
    where: {
      id: recipeId
    }
  })
  return NextResponse.json(recipe);
}
