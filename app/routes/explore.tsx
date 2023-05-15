import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ApplicationLayout } from "~/components";
import { authenticator } from "~/lib/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const auth = await authenticator.isAuthenticated(request);
  console.log(auth);
  return json({ user: await authenticator.isAuthenticated(request) });
};

function ExplorePage() {
  return (
    <ApplicationLayout>
      <h3>Hello from ExplorePage!</h3>
    </ApplicationLayout>
  );
}

export default ExplorePage;
