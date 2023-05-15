// app/routes/auth/google/callback.tsx
import type { LoaderArgs } from "@remix-run/node";
import { Routes } from "~/constants";
import { authenticator } from "~/lib/auth.server";

export let loader = ({ request }: LoaderArgs) => {
  return authenticator.authenticate("google", request, {
    successRedirect: Routes.Explore,
    failureRedirect: Routes.Login,
  });
};
