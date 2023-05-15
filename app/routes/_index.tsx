import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "Cooky" }];

// load Home page with featured recipes
export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/explore");
};
