import { useEffect, useMemo, useState } from "react";
import { createSearchParams, NavLink, useNavigate, useParams } from "react-router";

import { Input } from "@base-ui/react";
import Amicon, { aiArrowLeft, aiXmark } from "@studio384/amicons";

import icons from "@/data/icons";
import { Button } from "@/design/components/Button";
import Codeblock from "@/design/components/Codeblock";
import { IconCard } from "@/design/components/IconCard";
import { LargeIconGrid } from "@/design/components/LargeIconGrid";
import Header from "@/design/layout/LayoutElements/Header";
import { type IIcon, type ILibraryIcon } from "@/types";

export default function Icon() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [icon, setIcon] = useState<IIcon | null>(null);
  const firstCategory = icon?.categories?.[0];

  useEffect(() => {
    fetch(`data/icons/${slug}.json`)
      .then((res) => res.json())
      .then((data) => setIcon(data));
  }, [slug]);

  const reactImport = slug
    ? `ai${slug
        .split("-")
        .map((word) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join("")}`
    : "";

  const categoryIcons = useMemo(() => {
    if (firstCategory) {
      return icons.filter((icon) => icon.categories.includes(firstCategory as never));
    }

    return icons;
  }, [firstCategory]);

  const viIcon: ILibraryIcon = useMemo(() => icons.find((icon) => icon.component === reactImport)!, [reactImport]);

  return (
    <>
      <Header>
        <div className="flex flex-row items-center justify-between">
          <div className="flex grow flex-col items-start justify-start gap-2">
            <Button icon plain onClick={() => navigate("/icons")}>
              <Amicon icon={aiArrowLeft} />
            </Button>
            <h1 className="font-display text-5xl font-medium">{icon?.title}</h1>

            {(icon?.categories || icon?.tags) && (
              <div className="flex gap-1">
                {icon?.categories?.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/icons?${createSearchParams({ category: cat })}`}
                    className="font-display flex items-center gap-1 rounded-full bg-violet-500 px-2.5 py-1 text-xs text-white hover:bg-violet-600"
                  >
                    {cat}
                  </NavLink>
                ))}
                {icon?.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="font-display flex items-center gap-1 rounded-full border border-zinc-50 bg-zinc-50 px-2.5 py-1 text-xs dark:border-white/10 dark:bg-zinc-900"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-center gap-3">
              {icon?.created && (
                <div className="flex gap-2">
                  <p className="text-sm">Created</p>{" "}
                  <div className="font-display flex items-center gap-1 rounded-full border border-violet-300 bg-violet-200 px-1.5 py-px text-xs text-violet-600">
                    {icon?.created}
                  </div>
                </div>
              )}
              {icon?.updated && (
                <div className="flex gap-2">
                  <p className="text-sm">Last updated</p>{" "}
                  <div className="font-display flex items-center gap-1 rounded-full border border-violet-300 bg-violet-200 px-1.5 py-px text-xs text-violet-600">
                    {icon?.updated}
                  </div>
                </div>
              )}
            </div>
          </div>
          <LargeIconGrid icon={viIcon?.icon} />
        </div>
      </Header>
      <div className="container m-auto my-8 max-w-7xl px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-2xl font-medium">Usage</h3>
            <Codeblock>
              {`import Amicon, { ${reactImport} } from "@studio384/amicons";

<Amicon icon={${reactImport}} />`}
            </Codeblock>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-2xl font-medium">Examples</h3>
            <div className="grid auto-rows-[140px] grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <div className="order-1 flex items-center justify-center rounded-lg border border-violet-600 bg-violet-500 text-white">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Amicon icon={viIcon?.icon} bounce className="text-4xl" />
                  <p className="text-base/5">Bounce</p>
                </div>
              </div>
              <div className="order-2 col-span-2 flex items-center justify-center rounded-lg border border-violet-300 bg-zinc-100 dark:border-violet-900 dark:bg-zinc-800">
                <div className="flex flex-row flex-nowrap items-center gap-4 text-violet-600">
                  <Amicon icon={viIcon?.icon} className="text-4xl" />
                  <span className="text-4xl text-nowrap">{icon?.title}</span>
                </div>
              </div>
              <div className="order-3 col-span-2 flex items-center justify-center rounded-lg border border-violet-400 bg-violet-300 text-violet-800">
                <div className="flex flex-row gap-20">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} spin className="text-4xl" />
                    <p className="text-base/5">Spin</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} spin="pulse" className="text-4xl" />
                    <p className="text-base/5">Pulse</p>
                  </div>
                </div>
              </div>
              <div className="order-4 flex items-center justify-center rounded-lg border border-violet-300 bg-zinc-100 p-4 md:order-2 lg:order-4 dark:border-violet-900 dark:bg-zinc-800">
                <div className="flex h-9 w-56 flex-row items-center justify-center rounded-md border border-zinc-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-violet-600 dark:border-zinc-700">
                  <Amicon icon={viIcon?.icon} className="ms-2.5" />
                  <Input className="h-9 w-full px-2 text-base outline-0" placeholder={icon?.title} />
                </div>
              </div>
              <div className="order-6 flex items-center justify-center rounded-lg border border-violet-300 bg-zinc-100 sm:order-10 lg:order-5 dark:border-violet-900 dark:bg-zinc-800">
                <div className="flex size-12 items-center justify-center rounded-full border border-violet-600 bg-violet-500 text-xl text-white">
                  <Amicon icon={viIcon?.icon} />
                </div>
              </div>
              <div className="order-7 col-span-2 flex items-center justify-center rounded-lg border border-violet-300 bg-violet-100 text-violet-800 sm:col-span-3 md:col-span-2 lg:col-span-3 dark:border-violet-900 dark:bg-violet-950 dark:text-white">
                <div className="flex flex-row gap-20">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} rotate={90} className="text-4xl" />
                    <p className="text-base/5">90°</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} rotate={180} className="text-4xl" />
                    <p className="text-base/5">180°</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} rotate={270} className="text-4xl" />
                    <p className="text-base/5">270°</p>
                  </div>
                </div>
              </div>
              <div className="order-8 flex items-center justify-center rounded-lg border border-violet-300 bg-zinc-100 dark:border-violet-900 dark:bg-zinc-800">
                <div className="flex size-12 items-center justify-center rounded-lg border border-violet-300 bg-violet-200 text-xl text-violet-600">
                  <Amicon icon={viIcon?.icon} />
                </div>
              </div>
              <div className="order-9 flex items-center justify-center rounded-lg border border-violet-950 bg-violet-800 text-white">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Amicon icon={viIcon?.icon} beat className="text-4xl" />
                  <p className="text-base/5">Beat</p>
                </div>
              </div>
              <div className="order-10 col-span-2 flex items-center justify-center rounded-lg border border-violet-600 bg-violet-500 text-white sm:col-span-3 md:order-8 md:col-span-2 lg:order-10 lg:col-span-3">
                <div className="flex flex-row gap-20">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} flip className="text-4xl" />
                    <p className="text-base/5">Flip</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} flip="x" className="text-4xl" />
                    <p className="text-base/5">X</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Amicon icon={viIcon?.icon} flip="y" className="text-4xl" />
                    <p className="text-base/5">Y</p>
                  </div>
                </div>
              </div>
              <div className="order-1 flex items-center justify-center rounded-lg border border-violet-300 bg-violet-100 text-violet-800 sm:order-11 dark:border-violet-900 dark:bg-violet-950">
                <Button>
                  <Amicon icon={viIcon?.icon} /> Button
                </Button>
              </div>
              <div className="order-12 col-span-2 flex items-center justify-center rounded-lg border border-violet-300 bg-zinc-100 dark:border-violet-900 dark:bg-zinc-800">
                <div className="flex flex-row items-center gap-3 rounded-md border border-violet-300 bg-violet-200 p-3 text-violet-500">
                  <Amicon icon={viIcon?.icon} />
                  <span className="text-sm font-medium">Hi! We're demoing you an icon.</span>
                  <Button size="sm" icon>
                    <Amicon icon={aiXmark} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {firstCategory && categoryIcons.length >= 1 && (
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-2xl font-medium">
                More icons in{" "}
                <NavLink
                  to={`/icons?${createSearchParams({ category: firstCategory })}`}
                  className="text-violet-600 decoration-violet-600 underline-offset-2 hover:underline hover:decoration-2"
                >
                  {firstCategory}
                </NavLink>
              </h3>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(9rem,100%),1fr))] gap-2">
                {categoryIcons.slice(0, 28).map((icon: ILibraryIcon) => (
                  <IconCard key={icon.slug} icon={icon} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
