import Link from "next/link";
import "./globals.css";

import SkipToContent from "@components/SkipToContent";

const links: { name: string; url: string; }[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Recipes",
    url: "/recipes",
  },
  {
    name: "Add Recipe",
    url: "/recipes/add",
  },
];

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Recipe Book</title>
      </head>
      <body>
        <div className="mx-4 md:mx-16 mt-4 mb-12">
          <SkipToContent className="absolute top-0 left-12 -translate-y-full focus:translate-y-0" />
          <h1 className="text-4xl font-bold">
            <Link href="/">Recipe Book</Link>
          </h1>
          <div className="flex flex-col md:flex-row mt-6 mb-2 divide-y mobile:divide-none">
            {/* sidebar */}
            <nav className="mb-2 md:w-1/3 xl:w-1/5">
              <ul className="flex flex-row justify-evenly mobile:flex-col list-none">
                {links.map((link) => (
                  <li>
                    <Link className="text-gray-400 hover:text-black hover:underline focus:underline" href={link.url}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* main content */}
            <div id="main" tabIndex={-1} className="md:w-2/3 xl:w-3/5 pt-2">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
