import { Link, useLocation } from "react-router";

import Amicon, { aiArrowLeft, aiArrowRight } from "@studio384/amicons";

import { cn } from "@/utils/cn";

import { DOC_PAGES } from "../../app/docs/navigation";

export default function DocsPager() {
  const location = useLocation();

  const currentIndex = DOC_PAGES.findIndex((p) => p.path === location.pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null;
  const next = currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null;

  return (
    <div className="mt-6 flex gap-4 border-t border-zinc-950/5 pt-6">
      {prev ? (
        <Link
          to={prev.path}
          className={cn(
            "group grid flex-1 grid-cols-[min-content_auto] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
            "hover:bg-violet-600 hover:text-white hover:shadow-sm",
          )}
        >
          <Amicon icon={aiArrowLeft} className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75" />
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">{prev.sectionTitle}</span>
            <span className="font-display -mt-0.5 text-xl font-medium">{prev.title}</span>
          </div>
        </Link>
      ) : (
        <div className="flex-1 max-md:hidden" />
      )}
      <div className="flex-1" />
      {next ? (
        <Link
          to={next.path}
          className={cn(
            "group grid flex-1 grid-cols-[auto_min-content] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
            "hover:bg-violet-600 hover:text-white hover:shadow-sm",
          )}
        >
          <div className="flex flex-col items-end">
            <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">{next.sectionTitle}</span>
            <span className="font-display -mt-0.5 text-xl font-medium">{next.title}</span>
          </div>
          <Amicon icon={aiArrowRight} className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
