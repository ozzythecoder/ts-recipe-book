import { db } from "@/lib/db";
import type { FormData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { getParamsObject } from "@/lib/helper";
import { Recipe } from "@prisma/client";

// * Get recipes
export async function GET(
  request: NextRequest,
) {

  // get query parameters into js object
  const { title, cookTime, prepTime, rating, instructions, } = getParamsObject(request);

  try {
    let res: Recipe[];

    //TODO implement search for other properties
    if (title) {
      res = await db.recipe.findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive'
          }
        }
      })
    } else {
      res = await db.recipe.findMany();
    }

    return NextResponse.json(res, { status: 200 });

  } catch (e) {
    return NextResponse.json({ message: "There was an oopsie" }, { status: 500, statusText: `Error: ${e}` });
  }
}

// * Add new recipe
export async function POST(request: NextRequest) {

  const { title, cookTime, prepTime, rating, ingredients, instructions: instructionsObj } = await request.json() as FormData;
  const instructions = instructionsObj.map(({ step }) => step); // coerce into string array

  try {

    const recipe = await db.recipe.create({
      data: {
        title, cookTime: parseInt(cookTime), prepTime: parseInt(prepTime), rating, instructions,
        ingredients: {
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

    console.log(recipe)

    return NextResponse.json({ message: 'Recipe created', id: recipe.id }, { status: 201, statusText: 'Recipe created', });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating recipe' }, { status: 500, statusText: `${error}` })
  }

}
