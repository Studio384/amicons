import { Drawer as DrawerPrimitive } from "@base-ui/react";

import { cn } from "@/utils/cn";

function Portal({ children, ...props }: DrawerPrimitive.Portal.Props) {
  return (
    <DrawerPrimitive.Portal {...props}>
      <DrawerPrimitive.Backdrop
        className={cn(
          // Background
          "bg-black dark:[--backdrop-opacity:0.7]",
          // Styling
          "fixed inset-0 min-h-dvh",
          "opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))]",
          "[--backdrop-opacity:0.2] [--bleed:0rem]",
          // Animation
          "transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "data-ending-style:opacity-0",
          "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
          "data-starting-style:opacity-0",
          "data-swiping:duration-0",
        )}
      />
      {children}
    </DrawerPrimitive.Portal>
  );
}

function Viewport({ className, ...props }: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      className={cn(
        "fixed inset-0 flex items-stretch justify-end p-(--viewport-padding) [--viewport-padding:0px] supports-[-webkit-touch-callout:none]:[--viewport-padding:0.625rem]",
        className,
      )}
      {...props}
    />
  );
}

function Popup({ className, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Popup
      className={cn(
        // Text
        "text-zinc-900 dark:text-white",
        // Background
        "bg-zinc-50 dark:bg-zinc-900",
        // Styling
        "max-w-[calc(100dvw-20px)] h-full w-75 touch-auto overflow-y-auto overscroll-contain outline-1 outline-zinc-200 dark:outline-zinc-800",
        "[--bleed:0rem]",
        "transform-[translateX(var(--drawer-swipe-movement-x))]",
        "data-ending-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))]",
        "data-starting-style:transform-[translateX(calc(100%-var(--bleed)+var(--viewport-padding)+2px))]",
        // Animation
        "transition-transform duration-450 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
        // Others
        "data-swiping:select-none",
        className,
      )}
      {...props}
    />
  );
}

export const Drawer = {
  Root: DrawerPrimitive.Root,
  Portal,
  Viewport,
  Popup,
  Content: DrawerPrimitive.Content,
  Title: DrawerPrimitive.Title,
  Trigger: DrawerPrimitive.Trigger,
  Close: DrawerPrimitive.Close,
};
