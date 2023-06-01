import "./globals.css";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Recipe Book</title>
      </head>
      <body>
        <div className="mx-4 md:mx-16 mt-4">
          <h1 className="text-4xl font-bold">Recipe Book</h1>
          <div className="flex flex-col md:flex-row mt-6">
            {/* sidebar */}
            <div className="md:w-1/3 lg:w-1/4">
              <p>Sidebar stuff goes here</p>
              <p>Maybe some nav</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            {/* main content */}
            <div className="md:w-2/3 lg:w-3/4">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
