import { NavLink } from "react-router";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";

import { cn } from "@/utils/cn";

function Root(props: NavigationMenuPrimitive.Root.Props) {
  return <NavigationMenuPrimitive.Root {...props} />;
}

function List({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List className={cn("flex flex-col gap-1", className)} {...props} />
  );
}

const itemClassName = cn(
  // Text
  "font-display text-start",
  // Spacing
  "grid grid-cols-[min-content_auto_min-content] items-center",
  "data-[size=md]:px-4 data-[size=md]:py-2.5 data-[size=md]:gap-2.5",
  "data-[size=sm]:px-4 data-[size=sm]:py-1.5 data-[size=sm]:gap-2.5",
  // Styling
  "w-full rounded-sm",
  // Hover
  "hover:cursor-pointer hover:bg-violet-600 hover:text-white",
  // Active
  "data-active:bg-violet-600 data-active:text-white data-active:shadow-sm",
  // Transition
  "transition-all duration-150",
);

function Item({
  to,
  size = "md",
  ...props
}: { to: string; size?: "sm" | "md" } & NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Link
        render={<NavLink to={to} />}
        className={itemClassName}
        data-size={size}
        {...props}
      />
    </NavigationMenuPrimitive.Item>
  );
}

function ActionItem({
  className,
  size = "md",
  ...props
}: { size?: "sm" | "md" } & NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Item>
      <NavigationMenuPrimitive.Link
        render={<button />}
        className={cn(itemClassName, className)}
        data-size={size}
        {...props}
      />
    </NavigationMenuPrimitive.Item>
  );
}

export const NavigationMenu = {
  ActionItem,
  Root,
  List,
  Item,
};
