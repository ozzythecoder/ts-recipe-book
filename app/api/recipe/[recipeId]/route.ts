import { db } from "@/lib/db";
import { FormData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { recipeId: string }
}

// * Get recipe by ID
export async function GET(
  request: NextRequest,
  { params }: Params
) {
  const { recipeId } = params;

  const res = await db.recipe.findUnique({
    where: {
      id: parseInt(recipeId),
    },
  });

  return NextResponse.json(res);
}

// * Edit recipe by ID
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const id = parseInt(params.recipeId)
    const { title, cookTime, prepTime, rating, ingredients, instructions: instructionsObj } = await request.json() as FormData;
    const instructions = instructionsObj.map(({ step }) => step);

    const editedRecipe = await db.recipe.update({
      where: { id },
      data: {
        title, rating, cookTime: parseInt(cookTime), prepTime: parseInt(prepTime), instructions,
        ingredients: {
          deleteMany: {},
          create: ingredients.map(({ unit, amount, name }) => {
            return {
              unit,
              amount: parseInt(amount),
              ingredient: {
                connectOrCreate: {
                  where: { name },
                  create: { name }
                }
              }
            }
          })
        }
      }
    })

    console.log('edited recipe', editedRecipe)

    return NextResponse.json({ message: 'Updated recipe', id: editedRecipe.id }, { status: 200, statusText: 'Updated recipe' })

  } catch (error) {

    return NextResponse.json({ message: 'Error updating recipe' }, { status: 500, statusText: `${error}` })
  }
}

// * Delete recipe by ID
export async function DELETE(request: NextRequest, { params }: Params) {

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