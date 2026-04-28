import { useMemo } from "react";
import { NavLink, useLocation } from "react-router";

import Amicon from "@studio384/amicons";

import { type ILibraryIcon } from "@/types";

export function IconCard({ icon }: { icon: ILibraryIcon }) {
  const location = useLocation();

  const to = useMemo(() => {
    const params = new URLSearchParams(location.pathname === "/neo/icons" ? location.search : undefined);
    params.set("icon", icon.slug);

    const search = params.toString();

    return {
      pathname: "/neo/icons",
      search: search ? `?${search}` : "",
    };
  }, [icon.slug, location.pathname, location.search]);

  return (
    <NavLink
      to={to}
      className="relative flex flex-col items-center justify-center gap-3 rounded-sm border border-zinc-950/10 p-4 outline-0 transition-all focus-within:bg-violet-100 focus-within:text-violet-700 hover:border-violet-700/15 hover:bg-violet-100 hover:text-violet-700 hover:shadow-sm dark:border-zinc-50/5 dark:focus-within:bg-violet-600/20 dark:hover:bg-violet-600/20"
    >
      <Amicon icon={icon.icon} className="mt-1 text-3xl" />
      <span className="max-w-full truncate font-mono text-xs text-nowrap text-zinc-700">{icon.slug}</span>
    </NavLink>
  );
}
