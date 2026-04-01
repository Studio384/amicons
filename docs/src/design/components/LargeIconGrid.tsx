import Amicon, { type IAmicon } from "@studio384/amicons";
import clsx from "clsx";

export function LargeIconGrid({ icon }: { icon: IAmicon }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/40 p-8 backdrop-blur-xl dark:border-zinc-950/60 dark:bg-zinc-950/40">
      <div
        className={clsx(
          "flex items-center justify-center rounded-md border",
          // Grid background
          "bg-size-[var(--Amicon-scale,16px)_var(--Amicon-scale,16px)] bg-position-[-1px_-1px]",
          "bg-[linear-gradient(to_right,var(--color-violet-300)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-violet-300)_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,var(--color-violet-500)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-violet-500)_1px,transparent_1px)]",
          // Sizing
          "h-[calc(var(--Amicon-scale,16px)*16)] w-[calc(var(--Amicon-scale,16px)*16)]",
          // Border color
          "border-violet-400 dark:border-violet-700",
        )}
      >
        <Amicon icon={icon} className="text-[calc(var(--Amicon-scale,16px)*16)]" />
      </div>
    </div>
  );
}
