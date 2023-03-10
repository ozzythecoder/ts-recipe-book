import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request?: Request) {

  console.log('we made it to the GET!')

  const data = await db.recipe.findMany();
  return NextResponse.json({ data })
}