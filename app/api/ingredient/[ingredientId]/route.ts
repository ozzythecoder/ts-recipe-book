import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { ingredientId: string } }
) {
  const { ingredientId } = params;

  const res = await db.ingredient.findUnique({
    where: {
      id: parseInt(ingredientId),
    },
  });

  return NextResponse.json(res);
}
