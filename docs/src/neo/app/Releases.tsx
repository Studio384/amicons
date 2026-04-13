import { Link } from "react-router";

import Amicon, { aiAmicons, aiArrowRight } from "@studio384/amicons";
import { format, parse } from "date-fns";

import ReleaseCard from "@/neo/design/blocks/ReleaseCard";

import { releases } from "./releases/releaseEntries";

export default function Releases() {
  const [currentRelease, ...previousReleases] = releases;

  const CurrentRelease = currentRelease.Component;

  return (
    <>
      <article>
        <div className="relative isolate overflow-hidden bg-white bg-origin-border p-4 shadow-sm">
          <div className="z-10 container mx-auto max-w-4xl">
            <div className="mt-18 flex flex-row items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-sm bg-violet-500 text-2xl text-white shadow-sm">
                <Amicon icon={aiAmicons} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-display text-sm font-medium tracking-widest -mb-1 mt-0.5 text-violet-700 uppercase">
                  {format(
                    parse(currentRelease.publishDate, "yyyy-MM-dd", new Date()),
                    "d MMMM yyyy",
                  )}
                </p>
                <h1 className="font-display -mt-1 text-3xl font-bold">{currentRelease.name}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="container mx-auto max-w-4xl">
            <ReleaseCard
              excerpt={currentRelease.excerpt}
              newIcons={currentRelease.newIcons}
              updatedIcons={currentRelease.updatedIcons}
              renamedIcons={currentRelease.renamedIcons}
              removedIcons={currentRelease.removedIcons}
            >
              <CurrentRelease />
            </ReleaseCard>
          </div>
        </div>
      </article>

      {previousReleases.length > 0 ? (
        <div className="p-4 pt-0">
          <div className="container mx-auto max-w-4xl">
            <section className="flex flex-col gap-3 border-t border-zinc-200 pt-4">
              <h2 className="font-display text-3xl font-bold">Previous releases</h2>

              <div className="flex flex-col">
                {previousReleases.map((release) => (
                  <Link
                    key={release.slug}
                    to={`/neo/releases/${release.slug}`}
                    className="group -mt-px rounded-sm border border-zinc-950/10 bg-zinc-50 px-4 py-3 transition-all not-first:rounded-t-none not-last:rounded-b-none hover:z-10 hover:border-violet-700/15 hover:bg-violet-100 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-xl font-bold transition-colors group-hover:text-violet-700">
                          {release.name}
                        </h3>
                        <p className="-mt-2 text-sm">
                          {format(
                            parse(release.publishDate, "yyyy-MM-dd", new Date()),
                            "d MMMM yyyy",
                          )}{" "}
                          <span>&middot;</span>{" "}
                          <span className="text-zinc-600">Version {release.version}</span>
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
          </div>
        </div>
      ) : null}
    </>
  );
}
