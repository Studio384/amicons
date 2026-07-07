import { type PropsWithChildren } from "react";

import Amicon, { type IAmicon } from "@studio384/amicons";

export default function PageHeader({
  icon,
  title,
  subtitle,
  children,
}: { icon: IAmicon; title: string; subtitle: string } & PropsWithChildren) {
  return (
    <div className="sticky -top-18 isolate z-10 overflow-hidden bg-zinc-100/80 bg-origin-border p-4 shadow-sm backdrop-blur-xs dark:border-b dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="z-10 container mx-auto max-w-4xl">
        <div className="flex h-6 flex-col gap-2">{children}</div>

        <div className="mt-12 flex flex-row items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-sm bg-violet-500 text-2xl text-white shadow-sm">
            <Amicon icon={icon} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display mt-0.5 -mb-1 text-sm font-medium tracking-widest text-violet-700 uppercase dark:text-violet-500">
              {subtitle}
            </p>
            <h1 className="font-display -mt-1 text-3xl font-bold">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
