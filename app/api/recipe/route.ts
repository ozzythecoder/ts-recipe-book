import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
) {

  const name = request.nextUrl.searchParams.get('name')

  try {
    let res;

    if (name !== null) {

      res = await db.recipe.findMany({
        where: {
          title: {
            contains: name,
            mode: 'insensitive'
          }
        }
      })

    } else {
      res = await db.recipe.findMany();
    }
    return NextResponse.json(res);

  } catch (e) {
    return NextResponse.json({ message: "There was an oopsie" });
  }
}

export async function POST(request: NextRequest) {

  // TEST ROUTE
  const body = await request.json();
  return NextResponse.json({ message: `You sent: ${JSON.stringify(body)}` });
}
