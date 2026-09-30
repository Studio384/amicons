import { Link } from "react-router";

import { Separator } from "@base-ui/react";
import Amicon, { aiAmicons, aiArrowRight } from "@studio384/amicons";
import { format, parse } from "date-fns";

import ReleaseCard from "@/neo/design/blocks/ReleaseCard";

import PageHeader from "../design/blocks/PageHeader";
import { releases } from "./releases/releaseEntries";

export default function Releases() {
  const [currentRelease, ...previousReleases] = releases;

  const CurrentRelease = currentRelease.Component;

  return (
    <>
      <PageHeader
        icon={aiAmicons}
        title={currentRelease.name}
        subtitle={format(parse(currentRelease.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}
      />

      <div className="flex flex-col gap-4 p-4">
        <article className="container mx-auto max-w-4xl">
          <ReleaseCard
            excerpt={currentRelease.excerpt}
            newIcons={currentRelease.newIcons}
            updatedIcons={currentRelease.updatedIcons}
            renamedIcons={currentRelease.renamedIcons}
            removedIcons={currentRelease.removedIcons}
          >
            <CurrentRelease />
          </ReleaseCard>
        </article>

        <Separator
          orientation="horizontal"
          className="container mx-auto h-px max-w-4xl bg-zinc-950/5 dark:bg-zinc-50/10"
        />

        {previousReleases.length > 0 && (
          <section className="container mx-auto flex max-w-4xl flex-col gap-3">
            <h2 className="font-display text-3xl font-bold">Previous releases</h2>

            <div className="grid grid-cols-[auto_auto_auto_min-content] gap-x-2 gap-y-1 max-sm:grid-cols-[auto_auto_min-content]">
              {previousReleases.map((release) => (
                <Link
                  key={release.slug}
                  to={`/neo/releases/${release.slug}`}
                  className="group col-span-full grid grid-cols-subgrid items-center rounded-sm bg-zinc-50 py-2 ps-3.5 pe-4 outline -outline-offset-1 outline-zinc-950/10 transition-all hover:z-10 hover:bg-violet-100 hover:shadow-sm hover:outline-violet-700/15 dark:bg-zinc-900 dark:outline-zinc-50/5 dark:focus-within:bg-violet-600/20 dark:hover:bg-violet-600/20"
                >
                  <h3 className="font-display font-bold transition-colors group-hover:text-violet-700 max-sm:col-start-1 max-sm:row-start-1">
                    {release.name}
                  </h3>
                  <span className="text-sm text-zinc-500 max-sm:row-span-2 max-sm:row-start-1">
                    {format(parse(release.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}
                  </span>
                  <span className="text-sm text-zinc-500 max-sm:col-start-1 max-sm:-mt-1">{release.version}</span>
                  <Amicon
                    icon={aiArrowRight}
                    className="shrink-0 text-zinc-400 transition-colors group-hover:text-violet-700 max-sm:row-span-2 max-sm:row-start-1"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
