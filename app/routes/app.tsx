import { Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ApplicationLayout } from "~/components";
import { authenticator } from "~/lib/auth.server";

export async function loader({ request }: LoaderArgs) {
  return json({ user: await authenticator.isAuthenticated(request) });
}

export default function AppOutletWrapper() {
  return (
    <ApplicationLayout>
      <Outlet />
    </ApplicationLayout>
  );
}
