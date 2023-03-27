import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const recipeId = parseInt(params.id);
  const data = await db.recipesIngredients.findMany({
    where: {
      recipeId,      
    },
    include: {
      ingredient: {
        select: {
          name: true
        }
      }
    }
  });

  return NextResponse.json(data);
}
