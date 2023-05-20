import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Routes } from "~/constants";

export const meta: V2_MetaFunction = () => [{ title: "Cooky" }];

// always redirect to /app/explore
export const loader: LoaderFunction = async ({ request }) => {
  return redirect(Routes.Explore);
};
