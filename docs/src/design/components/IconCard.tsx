import { NavLink } from "react-router";

import Amicon from "@studio384/amicons";

import { type ILibraryIcon } from "@/types";

export function IconCard({ icon }: { icon: ILibraryIcon }) {
  return (
    <NavLink
      to={`/icons/${icon.slug}`}
      className="relative flex flex-col items-center justify-center gap-3 rounded-md bg-zinc-100 p-4 focus-within:bg-violet-200 focus-within:text-violet-700 hover:bg-violet-200 hover:text-violet-700 dark:bg-zinc-800 dark:focus-within:bg-violet-800 dark:focus-within:text-violet-400 dark:hover:bg-violet-800 dark:hover:text-violet-400"
    >
      <Amicon icon={icon.icon} className="mt-1 text-3xl" />
      <span className="max-w-full truncate font-mono text-xs text-nowrap text-zinc-700 dark:text-zinc-300">
        {icon.slug}
      </span>
    </NavLink>
  );
}
