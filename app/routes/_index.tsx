import { LoaderFunction, V2_MetaFunction, json } from "@remix-run/node";
import { HomePage } from "~/pages";
import { prisma } from "~/db.server";

export const meta: V2_MetaFunction = () => [{ title: "Cooky" }];

// load Home page with featured recipes
export const loader: LoaderFunction = async ({ request }) => {
  const recipes = await prisma.recipe.findMany();
  return json({
    recipes,
  });
};

export default HomePage;
