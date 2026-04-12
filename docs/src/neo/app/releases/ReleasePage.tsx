import { Link, Navigate, useParams } from "react-router";

import Amicon, { aiAmicons, aiArrowLeft, aiArrowRight } from "@studio384/amicons";
import { format, parse } from "date-fns";

import ReleaseCard from "@/neo/design/blocks/ReleaseCard";
import { cn } from "@/utils/cn";

import { getReleaseBySlug, releases } from "./releaseEntries";

export default function ReleasePage() {
  const { slug } = useParams();
  const release = getReleaseBySlug(slug);

  if (!release) {
    return <Navigate to="/neo/releases" replace />;
  }

  const ReleaseComponent = release.Component;
  const releaseIndex = releases.findIndex((entry) => entry.slug === release.slug);
  const nextRelease = releaseIndex > 0 ? releases[releaseIndex - 1] : undefined;
  const previousRelease = releaseIndex < releases.length - 1 ? releases[releaseIndex + 1] : undefined;

  return (
    <article>
      <div className="relative isolate overflow-hidden bg-white bg-origin-border p-4 shadow-sm">
        <div className="z-10 container mx-auto max-w-4xl">
          <div className="flex flex-col gap-2">
            <Link
              to="/neo/releases"
              className="font-display inline-flex items-center gap-1 text-violet-700 transition-colors hover:text-violet-900"
            >
              <Amicon icon={aiArrowLeft} /> All releases
            </Link>
          </div>

          <div className="mt-12 flex flex-row items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-sm bg-violet-500 text-2xl text-white shadow-sm">
              <Amicon icon={aiAmicons} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-3xl font-bold">{release.name}</h2>
              <p className="-mt-2 text-base">
                {format(parse(release.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}{" "}
                <span className="text-zinc-600">&middot; Version {release.version}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="container mx-auto flex max-w-4xl flex-col">
          <ReleaseCard
            excerpt={release.excerpt}
            newIcons={release.newIcons}
            updatedIcons={release.updatedIcons}
            renamedIcons={release.renamedIcons}
            removedIcons={release.removedIcons}
          >
            <ReleaseComponent />
          </ReleaseCard>

          {nextRelease || previousRelease ? (
            <nav className="mt-4 flex gap-1 border-t border-zinc-950/5 pt-4 max-sm:flex-col">
              {nextRelease ? (
                <Link
                  to={`/neo/releases/${nextRelease.slug}`}
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
                    <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">Next release</span>
                    <span className="font-display my-1 text-xl/5 font-medium">{nextRelease.name}</span>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              <div className="flex-1 max-xl:hidden" />
              {previousRelease ? (
                <Link
                  to={`/neo/releases/${previousRelease.slug}`}
                  className={cn(
                    "group grid flex-1 grid-cols-[auto_min-content] flex-col gap-2 rounded-sm px-3 py-2 text-end transition-all duration-150",
                    "hover:bg-violet-600 hover:text-white hover:shadow-sm",
                  )}
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">
                      Previous release
                    </span>
                    <span className="font-display my-1 text-xl/5 font-medium">{previousRelease.name}</span>
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
          ) : null}
        </div>
      </div>
    </article>
  );
}
