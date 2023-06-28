import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// * Get recipe by ID
export async function GET(
  request: NextRequest,
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

// * Delete recipe by ID
export async function DELETE(request: NextRequest, { params }: { params: { recipeId: string }}) {
  
  try {
    if (!params.recipeId) throw Error('Invalid ID')
    console.log('deleting recipeId:', params.recipeId)

    const deletedRecipe = await db.recipe.delete({
      where: {
        id: parseInt(params.recipeId)
      }
    })

    console.log(deletedRecipe);

    return NextResponse.json({ message: `Deleted recipe with ID ${params.recipeId}` }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error deleting recipe' }, { status: error === 'Error: Invalid ID' ? 400 : 500, statusText: `${error}` })
  }

}