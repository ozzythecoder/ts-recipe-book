import { RecipeWithIngredientNames } from "@/lib/types";
import DeleteRecipeButton from "@components/DeleteRecipeButton";
import EditRecipeButton from "@components/EditRecipeButton";

interface Props extends React.PropsWithChildren {
  recipe: RecipeWithIngredientNames;
}

export default function RecipeContent({ recipe }: Props) {
  return (
    <section className="relative">
      <div className="absolute right-0">
        <EditRecipeButton id={recipe.id} title={recipe.title} className="mr-2" />
        <DeleteRecipeButton id={recipe.id} title={recipe.title} />
      </div>
      <h2 className="text-2xl font-semibold">{recipe.title}</h2>
      <p>Rating: {recipe.rating} / 5</p>
      <p>Prep time: {recipe.prepTime} minutes</p>
      <p>Cook time: {recipe.cookTime} minutes</p>
      <div className="divide-y divide-dashed divide-gray-300">
        <div className="pb-2" />
        <div className="py-2">
          <p className="font-bold">Ingredients:</p>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.ingredientId}>
                {`
                  ${ingredient.amount}
                  ${ingredient.unit === "each" ? "" : ingredient.unit}
                  ${ingredient.ingredient.name}
                `}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-2">
          <p className="font-bold">Instructions:</p>
          <ol className="list-decimal list-inside">
            {recipe.instructions?.map((step) => (
              <li>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
