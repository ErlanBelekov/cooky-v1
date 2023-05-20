import type { Recipe } from "@prisma/client";
import { Link } from "@remix-run/react";
import { DynamicRoutes } from "~/constants";

interface RecipesListProps {
  recipes: Recipe[];
}

export function RecipesList(props: RecipesListProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {props.recipes.map((recipe) => {
        return (
          <Link to={DynamicRoutes.shared.recipeById(recipe.id)} key={recipe.id}>
            <img
              alt="recipe preview"
              src={recipe.images.length ? recipe.images[0] : ""}
              className="h-60 w-full rounded-md"
            />
            <p className="mt-4">{recipe.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
