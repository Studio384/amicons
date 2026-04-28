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

            <div className="flex flex-col">
              {previousReleases.map((release) => (
                <Link
                  key={release.slug}
                  to={`/neo/releases/${release.slug}`}
                  className="group -mt-px rounded-sm border border-zinc-950/10 bg-zinc-50 px-4 py-3 transition-all not-first:rounded-t-none not-last:rounded-b-none hover:z-10 hover:border-violet-700/15 hover:bg-violet-100 hover:shadow-sm dark:border-zinc-50/5 dark:bg-zinc-950 dark:focus-within:bg-violet-600/20 dark:hover:bg-violet-600/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-display text-xl font-bold transition-colors group-hover:text-violet-700">
                        {release.name}
                      </h3>
                      <p className="-mt-2 text-sm">
                        {format(parse(release.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}{" "}
                        <span>&middot;</span> <span className="text-zinc-600">Version {release.version}</span>
                      </p>
                    </div>
                    <Amicon
                      icon={aiArrowRight}
                      className="mt-1 shrink-0 text-zinc-400 transition-colors group-hover:text-violet-700"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
