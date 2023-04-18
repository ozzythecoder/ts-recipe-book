import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  const { recipeId } = params;

  const res = await db.recipe.findUnique({
    where: {
      id: parseInt(recipeId),
    },
  });

  return NextResponse.json(res);
}
