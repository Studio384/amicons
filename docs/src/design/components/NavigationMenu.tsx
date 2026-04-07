import { NavLink } from "react-router";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";
import Amicon, { type IAmicon } from "@studio384/amicons";

import { cn } from "@/utils/cn";

function Item({ label, to, active }: { label: string; to: string; active?: boolean }) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavLink
        to={to}
        className={cn(
          "font-display flex h-8 items-center justify-center rounded-sm px-2.5 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500",
          {
            "bg-violet-500 hover:bg-violet-600 focus-visible:outline-violet-700": active,
          },
        )}
      >
        {label}
      </NavLink>
    </NavigationMenuPrimitive.Item>
  );
}

function Social({ label, to, icon }: { label: string; to: string; icon: IAmicon }) {
  return (
    <NavigationMenuPrimitive.Item>
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        className="flex size-8 items-center justify-center rounded-sm text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
      >
        <Amicon icon={icon} /> <span className="sr-only">{label}</span>
      </a>
    </NavigationMenuPrimitive.Item>
  );
}

function List({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return <NavigationMenuPrimitive.List className={cn(className, "flex gap-1")} {...props} />;
}

export const NavigationMenu = {
  Item,
  Social,
  List,
};
