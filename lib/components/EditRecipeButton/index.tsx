'use client';
import { Button } from "@ui/button";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  id: number;
  title: string;
}

export default function EditRecipeButton({ className, id, title }: Props) {

  const router = useRouter();

  const handleEdit = () => {
    alert('bazinga')
  }

  return (
    <Button size='sm' className={className} onClick={handleEdit} type="button" >
      <Pen className="h-4 w-4" />
    </Button>
  )
}