import { useMemo } from "react";
import { Link } from "react-router";

import Amicon, { aiXmark } from "@studio384/amicons";

import { type ILibraryIcon } from "@/types";
import { cn } from "@/utils/cn";
import { formatSvg } from "@/utils/formatSvg";

import Codeblock from "./Codeblock";
import IconExamples from "./IconExamples";

interface IconDetailsProps {
  icon: ILibraryIcon;
  onClose: () => void;
}

export default function IconDetails({ icon, onClose }: IconDetailsProps) {
  const svg = useMemo(
    () => (typeof DOMParser === "undefined" ? icon.icon.data : formatSvg(icon.icon.data)),
    [icon.icon.data],
  );

  const usage = useMemo(
    () => `import Amicon, { ${icon.component} } from "@studio384/amicons";

export default function App() {
  return <Amicon icon={${icon.component}} />;
}`,
    [icon.component],
  );

  const created = icon.created;
  const updated = icon.updated;

  return (
    <>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex flex-col gap-5 border-b border-violet-600/10 bg-violet-50 p-6 backdrop-blur-sm dark:bg-violet-800/90">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display -mt-1 text-3xl leading-tight font-bold wrap-break-word text-zinc-900 dark:text-white">
              {icon.slug}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close icon details"
              className="flex size-8 shrink-0 items-center justify-center rounded-sm text-violet-400 transition-colors hover:bg-violet-200 hover:text-violet-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-600 dark:hover:bg-violet-700 dark:hover:text-white"
            >
              <Amicon icon={aiXmark} className="text-xl" />
            </button>
          </div>
        </header>

        <div className="relative flex items-center justify-center overflow-hidden border-b border-violet-700/15 bg-violet-400 py-16 shadow-sm dark:border-white/10 dark:bg-violet-800">
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-white/20)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-white/20)_1px,transparent_1px)] bg-[size:24px_24px] bg-position-[-1px_-1px]"
          />
          <Amicon
            icon={icon.icon}
            className="relative text-[8rem] leading-none text-white drop-shadow-sm [&_svg]:w-full"
          />
        </div>

        <div className="flex flex-col gap-6 p-6">
          {(created || updated) && (
            <dl className="grid grid-cols-2 gap-2">
              {created && (
                <div className="flex flex-col gap-1 rounded-sm border border-zinc-950/5 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-950">
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">Created</dt>
                  <dd className="font-display text-sm font-medium">{created}</dd>
                </div>
              )}
              {updated && (
                <div className="flex flex-col gap-1 rounded-sm border border-zinc-950/5 bg-zinc-50 px-4 py-3 dark:border-white/10 dark:bg-zinc-950">
                  <dt className="text-xs text-zinc-500 dark:text-zinc-400">Last updated</dt>
                  <dd className="font-display text-sm font-medium">{updated}</dd>
                </div>
              )}
            </dl>
          )}

          {(icon.categories.length > 0 || icon.tags.length > 0) && (
            <section className="flex flex-col gap-2.5">
              <h3 className="font-display text-xl font-semibold text-zinc-500 dark:text-white">Categories & tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {icon.categories.map((category) => (
                  <Link
                    key={category}
                    to={`/neo/icons?categories=${category}`}
                    onClick={onClose}
                    className="rounded-sm bg-violet-100 px-2.5 py-1 text-xs text-violet-700 transition-colors hover:bg-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:hover:bg-violet-900"
                  >
                    {category}
                  </Link>
                ))}

                {icon.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <section className="flex flex-col gap-2.5">
            <h3 className="font-display text-xl font-semibold text-zinc-500 dark:text-white">Examples</h3>
            <IconExamples icon={icon.icon} />
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="font-display text-xl font-semibold text-zinc-500 dark:text-white">Usage</h3>
            <Codeblock code={usage} lang="jsx" title="React JSX" />
          </section>

          <section className="flex flex-col gap-2.5">
            <h3 className="font-display text-xl font-semibold text-zinc-500 dark:text-white">SVG</h3>
            <Codeblock code={svg} lang="html" title={`${icon.slug}.svg`} />
            <p className={cn("text-xs text-zinc-500 dark:text-zinc-400")}>
              Drop the raw SVG markup into your project to use the icon without the React component.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
