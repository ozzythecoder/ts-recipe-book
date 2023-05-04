import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {

  let params: any = {};
  for (const [key, val] of request.nextUrl.searchParams.entries()) {
    params[key] = val;
  }
  const { name, id } = params;

  try {
    let res;

    if (name) {
      res = await db.ingredient.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive'
          }
        }
      })
    } else {
      res = await db.ingredient.findMany();
    }

    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ "message": "We did a whoopsie" })
  }
  
}