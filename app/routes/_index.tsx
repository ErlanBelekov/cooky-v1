import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => [{ title: "Cooky" }];

export default function Index() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-yellow-500">
      <p>Hello World!</p>
    </main>
  );
}
