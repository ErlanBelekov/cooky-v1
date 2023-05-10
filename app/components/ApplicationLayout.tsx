import { Link } from "@remix-run/react";
import type { PropsWithChildren } from "react";

import { HomeIcon } from "@heroicons/react/24/outline";

import { Routes } from "~/constants";
import { Avatar } from "~/ui";

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
];

export function ApplicationLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                onClick={() => {}}
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
              <Link
                to={process.env.API_URL ?? ""}
                className="ml-2 flex md:mr-24"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="mr-3 h-8"
                  alt="FlowBite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                  Cooky
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="ml-3 flex items-center">
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                  onClick={() => {}}
                >
                  <span className="sr-only">Open user menu</span>
                  <Avatar src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {NavigationLinks.map((link) => {
              return (
                <li key={link.to}>
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
        </div>
      </aside>
      <div className="h-screen bg-red-200 p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 bg-yellow-400 p-4 dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}
