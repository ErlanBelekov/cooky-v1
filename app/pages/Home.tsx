import { ApplicationLayout } from "~/components";

// this data is accessible for children of home page
export type HomePageLoaderData = {};

export function HomePage() {
  return <ApplicationLayout></ApplicationLayout>;
}
