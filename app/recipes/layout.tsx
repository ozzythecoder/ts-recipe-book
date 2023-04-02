export default function RecipeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Recipes
      </h2>
      {children}
    </section>
  );
}
