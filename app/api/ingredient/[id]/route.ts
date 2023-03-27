import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const ingredientId = parseInt(params.id)
    const recipe = await db.ingredient.findUnique({
      where: {
        id: ingredientId
      }
    })
    return NextResponse.json(recipe)
  } catch (e) {
    console.error(e);
    return null;
  }
}
