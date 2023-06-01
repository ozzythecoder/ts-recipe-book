import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Link className="text-gray-400 hover:text-black hover:underline focus:underline" href="/recipes">Let's eat!</Link>
    </main>
  );
}
