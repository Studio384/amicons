import { Outlet, Link, useLocation } from "react-router";

import Amicon, { aiBook, aiArrowLeft, aiArrowRight } from "@studio384/amicons";
import { cn } from "@/utils/cn";

import { DOC_PAGES } from "./docs/navigation";

export default function NeoDocumentation() {
  const location = useLocation();
  const currentPage = DOC_PAGES.find((page) => page.path === location.pathname);
  const currentIndex = DOC_PAGES.findIndex((page) => page.path === location.pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null;
  const next = currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null;

  return (
    <>
      <div className=" isolate overflow-hidden bg-white/80 backdrop-blur-xs bg-origin-border p-4 shadow-sm sticky -top-18 z-10">
        <div className="z-10 container mx-auto max-w-4xl">
          <div className="mt-18 flex flex-row items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-sm bg-violet-500 text-2xl text-white shadow-sm">
              <Amicon icon={currentPage?.icon ?? aiBook} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-display text-sm font-medium tracking-widest -mb-1 mt-0.5 text-violet-700 uppercase">
                {currentPage?.sectionTitle ?? "Documentation"}
              </p>
              <h1 className="font-display -mt-1 text-3xl font-bold">
                {currentPage?.title ?? "Documentation"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <article className="p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="neo-doc-page neo-docs">
            <Outlet />
          </div>
        </div>
      </article>

      <div className="p-4 pt-0">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex gap-1 border-t border-zinc-950/5 pt-4 max-sm:flex-col">
            {prev ? (
              <Link
                to={prev.path}
                className={cn(
                  "group grid flex-1 grid-cols-[min-content_auto] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                  "hover:bg-violet-600 hover:text-white hover:shadow-sm",
                )}
              >
                <Amicon
                  icon={aiArrowLeft}
                  className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">
                    {prev.sectionTitle}
                  </span>
                  <span className="font-display my-1 text-xl/5 font-medium">{prev.title}</span>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            <div className="flex-1 max-md:hidden" />
            {next ? (
              <Link
                to={next.path}
                className={cn(
                  "group grid flex-1 grid-cols-[auto_min-content] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                  "hover:bg-violet-600 hover:text-white hover:shadow-sm",
                )}
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">
                    {next.sectionTitle}
                  </span>
                  <span className="font-display my-1 text-xl/5 font-medium">{next.title}</span>
                </div>
                <Amicon
                  icon={aiArrowRight}
                  className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
