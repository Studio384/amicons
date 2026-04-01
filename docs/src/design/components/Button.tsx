import { Button as ButtonPrimitive } from "@base-ui/react";
import { cva, type VariantProps } from "cva";

import { cn } from "@/utils/cn";

const buttonVariants = cva({
  base: [
    "rounded-md hover:z-10",
    // Spacing
    "inline-flex items-center justify-center py-1.5",
    // Border
    "box-border border",
    // Text
    "font-semibold text-nowrap",
    // Focus
    "focus-visible:z-10 focus-visible:outline-2",
    // Disabled
    "disabled:pointer-events-none disabled:text-zinc-400 dark:disabled:text-zinc-500",
  ],
  variants: {
    variant: {
      primary:
        "hover:border-violet-950/20 hover:bg-violet-600 hover:text-white focus-visible:outline-violet-600/50",
      secondary: [
        "hover:backdrop-blur-xl data-popup-open:backdrop-blur-xl",
        "hover:border-zinc-800/5 hover:bg-zinc-800/10 focus-visible:outline-violet-600/50  data-popup-open:border-zinc-800/5 data-popup-open:bg-zinc-800/10  ",
        "dark:hover:border-zinc-50/5 dark:hover:bg-zinc-50/10 dark:focus-visible:outline-violet-600/50  dark:data-popup-open:border-zinc-200/5 dark:data-popup-open:bg-zinc-200/10  ",
      ],
      danger:
        "text-red-600 hover:border-red-950/30 hover:bg-red-700 hover:text-white focus-visible:outline-red-600/50 ",
      success:
        "text-green-600 hover:border-green-950/30 hover:bg-green-700 hover:text-white focus-visible:outline-green-600/50 ",
    },
    size: {
      md: "h-9 gap-x-2 px-3 text-base/6",
      sm: "h-7.5 gap-x-1 px-2.5 text-sm/6",
    },
    icon: {
      false: "",
      true: "shrink-0 p-0",
    },
    plain: {
      false:
        "border-zinc-950/10 disabled:border-zinc-950/5 disabled:bg-zinc-50 dark:disabled:bg-zinc-900 dark:disabled:border-zinc-50/5",
      true: "border-transparent",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      plain: false,
      className: "bg-violet-500 text-white focus-visible:border-violet-600",
    },
    {
      variant: "secondary",
      plain: false,
      className: "bg-zinc-50 dark:bg-zinc-800 focus-visible:border-violet-600",
    },
    {
      variant: "danger",
      plain: false,
      className: "bg-zinc-50 dark:bg-zinc-800 focus-visible:border-red-700",
    },
    {
      variant: "success",
      plain: false,
      className: "bg-zinc-50 dark:bg-zinc-800 focus-visible:border-green-600",
    },
    {
      icon: true,
      size: "md",
      className: "size-9",
    },
    {
      icon: true,
      size: "sm",
      className: "size-7.5",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    plain: false,
  },
});

export function Button({
  className,
  variant,
  size,
  icon,
  plain,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className, icon, plain }))}
      {...props}
    />
  );
}
