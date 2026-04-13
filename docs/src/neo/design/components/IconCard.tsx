import { NavLink } from "react-router";

import Amicon from "@studio384/amicons";

import { type ILibraryIcon } from "@/types";

export function IconCard({ icon }: { icon: ILibraryIcon }) {
  return (
    <NavLink
      to={`/neo/icons/${icon.slug}`}
      className="relative flex flex-col items-center justify-center gap-3 rounded-sm border border-zinc-950/10 p-4 transition-all focus-within:bg-violet-100 focus-within:text-violet-700 hover:border-violet-700/15 hover:bg-violet-100 hover:text-violet-700 hover:shadow-sm"
    >
      <Amicon icon={icon.icon} className="mt-1 text-3xl" />
      <span className="max-w-full truncate font-mono text-xs text-nowrap text-zinc-700">
        {icon.slug}
      </span>
    </NavLink>
  );
}
