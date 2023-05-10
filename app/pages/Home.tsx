import type { Recipe } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { ApplicationLayout } from "~/components";

// this data is accessible for children of home page
export type HomePageLoaderData = {
  recipes: Recipe[];
};

export function HomePage() {
  const loaderData = useLoaderData<HomePageLoaderData>();
  return (
    <ApplicationLayout>
      <p>Featured recipes!</p>
      <div className="my-4 flex items-center">
        {loaderData.recipes.map((recipe) => {
          return (
            <div
              key={recipe.id}
              className="flex flex-col items-center justify-center rounded-lg p-4"
            >
              <img
                src={recipe.images[0]}
                className="h-16 w-16 rounded-lg bg-red-500"
                alt="recipe preview"
              />
              <div className="mt-2">
                <p>{recipe.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </ApplicationLayout>
  );
}
