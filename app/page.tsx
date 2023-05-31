import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Hello world!</h1>
      <Link href="/recipes">Let's eat!</Link>
    </main>
  );
}
