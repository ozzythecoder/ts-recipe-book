'use client';

import { Button } from "@ui/button";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  className: string;
}

export default function SkipToContent({ className }: Props) {

  const router = useRouter();
  const currenturl = usePathname();

  return (
    <Button
      className={className}
      aria-label="skip to content"
      type="button"
      onClick={() => router.push(currenturl + "/#main")}
    >
      Skip to Content
    </Button>
  )
}