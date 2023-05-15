// app/routes/auth/google.tsx
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Routes } from "~/constants";
import { authenticator } from "~/lib/auth.server";

export let loader = () => redirect(Routes.Explore);

export let action = ({ request }: ActionArgs) => {
  return authenticator.authenticate("google", request);
};
