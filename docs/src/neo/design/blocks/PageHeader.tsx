import { type PropsWithChildren } from "react";

import Amicon, { type IAmicon } from "@studio384/amicons";

import { cn } from "@/utils/cn";

const widthClasses = {
  md: "max-w-4xl",
  lg: "max-w-7xl",
} as const;

type PageHeaderWidth = keyof typeof widthClasses;

export default function PageHeader({
  icon,
  title,
  subtitle,
  width = "md",
  className,
}: { icon: IAmicon; title: string; subtitle: string; width?: PageHeaderWidth } & PropsWithChildren & {
    className?: string;
  }) {
  return (
    <div
      className={cn(
        "sticky top-0 isolate z-10 bg-white/90 p-4 backdrop-blur-xs dark:border-b dark:border-zinc-500/20 dark:bg-zinc-950/90",
        className,
      )}
    >
      <div className={cn("container mx-auto flex flex-col gap-4", widthClasses[width])}>
        <div className="flex flex-row items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-violet-500 text-2xl text-white shadow-sm">
            <Amicon icon={icon} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display mt-1 text-sm/4 font-medium text-violet-700 dark:text-violet-500">{subtitle}</p>
            <h1 className="font-display -mt-2 text-3xl/4 leading-tight font-bold">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
