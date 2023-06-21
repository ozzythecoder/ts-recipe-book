import "./globals.css";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Recipe Book</title>
      </head>
      <body>
        <div className="mx-4 md:mx-16 mt-4 mb-12">
          <h1 className="text-4xl font-bold">Recipe Book</h1>
          <div className="flex flex-col md:flex-row mt-6">
            {/* sidebar */}
            <div className="md:w-1/3 xl:w-1/5">
              <p>Sidebar stuff goes here</p>
              <p>Maybe some nav</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            {/* main content */}
            <div className="md:w-2/3 xl:w-3/5">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
