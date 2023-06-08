import Link from "next/link";

interface Props extends React.PropsWithChildren {}

export default function RecipeLayout({ children }: Props) {
  return (
    <>
    <div className="my-2">
      <Link href="/recipes" className="text-sm text-gray-400 hover:text-black hover:underline focus:underline">Back to recipes</Link>
    </div>
      <>{children}</>
    </>
  );
}
