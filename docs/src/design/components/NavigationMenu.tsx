import { NavLink } from "react-router";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";

import { cn } from "cn";

function Root(props: NavigationMenuPrimitive.Root.Props) {
  return <NavigationMenuPrimitive.Root {...props} />;
}

function List({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return <NavigationMenuPrimitive.List className={cn("flex flex-col gap-1", className)} {...props} />;
}

function Item({ to, ...props }: { to: string } & NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Link
        render={<NavLink to={to} />}
        className={cn(
          // Text
          "font-display text-start",
          // Spacing
          "grid grid-cols-[min-content_auto_min-content] items-center",
          "gap-2.5 px-4 py-2",
          // Styling
          "w-full rounded-sm",
          // Hover
          "hover:cursor-pointer hover:bg-violet-600 hover:text-white",
          // Active
          "data-active:bg-violet-600 data-active:text-white data-active:shadow-sm",
          // Transition
          "transition-all duration-150",
        )}
        {...props}
      />
    </NavigationMenuPrimitive.Item>
  );
}

export const NavigationMenu = {
  Root,
  List,
  Item,
};
