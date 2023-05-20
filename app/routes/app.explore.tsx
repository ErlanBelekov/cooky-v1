import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RecipesList } from "~/components";
import { prisma } from "~/db.server";
import { authenticator } from "~/lib/auth.server";

export async function loader({ request }: LoaderArgs) {
  // initially load only 20 recipes on the screen
  const recipes = await prisma.recipe.findMany({ take: 20 });

  return json({ user: await authenticator.isAuthenticated(request), recipes });
}

function ExplorePage() {
  const loaderData = useLoaderData<typeof loader>();

  console.log(loaderData);

  const recipes = loaderData.recipes.map((recipe) => ({
    ...recipe,
    createdAt: new Date(recipe.createdAt),
    updatedAt: new Date(recipe.updatedAt),
  }));

  return <RecipesList recipes={recipes} />;
}

export default ExplorePage;
