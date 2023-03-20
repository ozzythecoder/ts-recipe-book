import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request?: Request) {
  const data = await db.recipe.findMany();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  // test route
  const data = await request.json();
  console.log(data);
  return;
}
