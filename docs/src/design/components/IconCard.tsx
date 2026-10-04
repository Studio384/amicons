import { type HTMLAttributes } from "react";
import { useLocation, useNavigate } from "react-router";

import Amicon from "@studio384/amicons";

import { iconPath, markOpenedFromGrid } from "@/routes";
import { type ILibraryIcon } from "@/types";

type IconCardProps = {
  icon: ILibraryIcon;
  openAsDrawer?: boolean;
} & HTMLAttributes<HTMLAnchorElement>;

export function IconCard({ icon, openAsDrawer = false, ...props }: IconCardProps) {
  const location = useLocation();
  const navigate = useNavigate();

  function openIcon() {
    markOpenedFromGrid(icon.slug);
    navigate({ pathname: iconPath(icon.slug), search: location.search });
  }

  return (
    <a
      href={`#${iconPath(icon.slug)}${openAsDrawer ? location.search : ""}`}
      onClick={(event) => {
        if (!openAsDrawer) return;

        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

        event.preventDefault();
        openIcon();
      }}
      className="relative flex flex-col items-center justify-center gap-3 rounded-sm border border-zinc-950/10 bg-zinc-50 p-4 outline-0 transition-all focus-within:bg-violet-100 focus-within:text-violet-700 hover:border-violet-700/15 hover:bg-violet-100 hover:text-violet-700 hover:shadow-sm dark:bg-zinc-900 dark:focus-within:bg-violet-600/20 dark:hover:bg-violet-600/20"
      {...props}
    >
      <Amicon icon={icon.icon} className="mt-1 text-3xl" />
      <span className="max-w-full truncate font-mono text-xs text-nowrap text-zinc-700 dark:text-zinc-500">
        {icon.slug}
      </span>
    </a>
  );
}
