import type { ActionArgs } from "@remix-run/server-runtime";
import { Routes } from "~/constants";
import { authenticator } from "~/lib/auth.server";

export async function action({ request }: ActionArgs) {
  await authenticator.logout(request, { redirectTo: Routes.Explore });
}
