import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request?: Request) {
  const data = await db.ingredient.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const res = await db.ingredient.create({
      data: {
        name: data.name,
      },
    });
    console.log("posted new ingredient", res);
  } catch (e) {
    console.log(e);
  }
}
