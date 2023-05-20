import { Link, Form, useLoaderData } from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { useState } from "react";

import { HomeIcon, CakeIcon } from "@heroicons/react/24/outline";

import { Routes } from "~/constants";
import { Avatar } from "~/ui";
import type { User } from "@prisma/client";
import { Sheet } from "~/ui/Sheet";

type NavigationLink = {
  to: Routes;
  text: string;
  Icon: () => JSX.Element;
};

const NavigationLinks: NavigationLink[] = [
  {
    to: Routes.Explore,
    text: "Explore",
    Icon: () => <HomeIcon className="h-6 w-6" />,
  },
  {
    to: Routes.Explore,
    text: "Diets",
    Icon: () => <CakeIcon className="h-6 w-6" />,
  },
];

function NavigationLinksList() {
  return (
    <ul className="space-y-2 font-medium">
      {NavigationLinks.map((link) => {
        return (
          <li key={link.text}>
            <Link
              to={link.to}
              className="flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {<link.Icon />}
              <span className="ml-3">{link.text}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function LogoWithText() {
  return (
    <Link to={process.env.API_URL ?? ""} className="flex">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        className="mr-3 h-8"
        alt="FlowBite Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
        Cooky
      </span>
    </Link>
  );
}

export function ApplicationLayout({ children }: PropsWithChildren<unknown>) {
  const loaderData = useLoaderData<{ user?: User }>();

  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  return (
    <div>
      <nav className="fixed top-0 z-10 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-950">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileSheetOpen((prev) => !prev);
                }}
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <LogoWithText />
            </div>
            <div className="hidden items-center md:flex">
              <div className="ml-3 flex items-center">
                {loaderData.user ? (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                      onClick={() => {}}
                    >
                      <span className="sr-only">Open user menu</span>
                      {loaderData.user.avatarUrl && (
                        <Avatar src={loaderData.user.avatarUrl} />
                      )}
                    </button>
                    <Form action="/auth/logout" method="post">
                      <button>Logout</button>
                    </Form>
                  </div>
                ) : (
                  <Link to="/auth/login">Login</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sheet
        isOpen={isMobileSheetOpen}
        closeSheet={() => setIsMobileSheetOpen(false)}
      >
        <div className="flex h-full w-full flex-col justify-between border-b border-r-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-950">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <LogoWithText />
              {loaderData && loaderData.user ? (
                <Link to={Routes.Settings}>
                  <Avatar src={loaderData.user.avatarUrl ?? ""} />
                </Link>
              ) : (
                <></>
              )}
            </div>
            <NavigationLinksList />
          </div>
          <div className="flex flex-col">
            {loaderData && !loaderData.user ? (
              <div>
                <Link to={Routes.Login}>
                  <p>Join Cooky!</p>
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Sheet>
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white px-3 py-3 transition-transform dark:border-gray-700 dark:bg-slate-950 sm:translate-x-0 lg:px-5">
        <NavigationLinksList />
      </aside>
      <div className="h-screen bg-white p-4 dark:bg-slate-950 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 bg-yellow-400 p-4 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
