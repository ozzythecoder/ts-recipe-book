import "./globals.css";

export default function App({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <title>Recipe Book</title>
      </head>
      <body>
        { children }
      </body>
    </html>
  )
}