import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props extends React.PropsWithChildren {}

export default function RecipeLayout({ children }: Props) {
  return (
    <>
      <span>
        <Link
          href="/recipes"
          className="flex flex-row my-2 items-center justify-center mobile:justify-start text-sm text-gray-400 hover:text-black hover:underline focus:underline"
        >
          <ArrowLeft
            className="inline mr-2"
            size={14}
          />
          Back to recipes
        </Link>
      </span>
      <>{children}</>
    </>
  );
}
