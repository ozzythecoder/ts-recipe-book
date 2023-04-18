import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await db.recipe.findMany();
  return NextResponse.json(res);
}