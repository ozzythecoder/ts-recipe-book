import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { searchParams }: { searchParams: { name?: string } }
  ) {

  try {
    
    const res = await db.recipe.findMany();
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ "message": "There was an oopsie" })
  }
}

export async function POST(request: Request) {
  
  const body = await request.json();

  return NextResponse.json({ "message": `You sent: ${JSON.stringify(body)}`})
}