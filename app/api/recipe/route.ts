import { db } from "@/lib/db";
import type { FormData } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { getParamsObject } from "@/lib/helper";

export async function GET(
  request: NextRequest,
) {

  // get query parameters into js object
  const { title, cookTime, prepTime, rating, instructions, } = getParamsObject(request);

  try {
    let res;

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

    return NextResponse.json(res);

  } catch (e) {
    return NextResponse.json({ message: "There was an oopsie" }, { status: 500 } );
  }
}

export async function POST(request: NextRequest) {

  const body = await request.json() as FormData;
  const { title, cookTime, prepTime, rating, ingredients, instructions: instructionsObj } = body;
  const instructions = instructionsObj.map(({ step }) => step);

  

  console.log('POST RECEIVED:')
  return NextResponse.json({ message: `You sent: ${JSON.stringify(body)}` });
}
