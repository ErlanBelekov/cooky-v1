import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { HomePage } from "~/pages";

export const meta: V2_MetaFunction = () => [{ title: "Cooky" }];

// load Home page with featured recipes
export const loader: LoaderFunction = ({ request }) => {
  return "Hey";
};

export default HomePage;
