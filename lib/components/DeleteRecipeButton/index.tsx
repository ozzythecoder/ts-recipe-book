// TODO:
// * Confirm delete

"use client";

import { Button } from "@ui/button";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  className: string;
  id: number;
  title: string;
}

export default function DeleteRecipeButton({ id, className, title }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);

    const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/recipes");
    } else {
      setLoading(false);
      console.log(response.statusText);
    }
  };

  return (
    <Button disabled={loading} aria-label={`Delete recipe ${title}`} variant="destructive" type="button" size="sm" className={className} onClick={handleDelete}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  );
}
