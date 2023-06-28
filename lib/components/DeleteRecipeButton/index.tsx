"use client"

import { Button } from "@ui/button";
import clsx from "clsx";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  className: string;
  id: number;
}

export default function DeleteRecipeButton({ id, className }: Props) {

  const router = useRouter();

  const handleDelete = () => {
    alert('Delete clicked');
  }

  return (
    <Button variant="destructive" type="button" className={clsx(className, "p-4")} onClick={handleDelete}>
      <Trash className="h-4 w-4" />
    </Button>
  )
}