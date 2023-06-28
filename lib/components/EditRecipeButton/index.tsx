"use client";
import { Button } from "@ui/button";
import { Loader2, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  className?: string;
  id: number;
  title: string;
}

export default function EditRecipeButton({ className, id, title }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = () => {
    setLoading(true);
    router.push(`/recipes/edit/${id}`);
  };

  return (
    <Button disabled={loading} aria-label={`Edit recipe ${title}`} size="sm" className={className} onClick={handleEdit} type="button">
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Pen className="h-4 w-4" />}
    </Button>
  );
}
