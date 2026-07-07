import { Link, Navigate, useParams } from "react-router";

import { Separator } from "@base-ui/react";
import Amicon, { aiAmicons, aiArrowLeft, aiArrowRight } from "@studio384/amicons";
import { format, parse } from "date-fns";

import ReleaseCard from "@/neo/design/blocks/ReleaseCard";
import { cn } from "@/utils/cn";

import PageHeader from "../design/blocks/PageHeader";
import { getReleaseBySlug, releases } from "./releases/releaseEntries";

export default function Release() {
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
    <>
      <PageHeader
        icon={aiAmicons}
        title={release.name}
        subtitle={format(parse(release.publishDate, "yyyy-MM-dd", new Date()), "d MMMM yyyy")}
      >
        <Link
          to="/neo/releases"
          className="font-display inline-flex items-center gap-1 text-violet-700 transition-colors hover:text-violet-900 dark:text-white dark:hover:text-violet-300"
        >
          <Amicon icon={aiArrowLeft} /> All releases
        </Link>
      </PageHeader>

      <div className="flex flex-col gap-4 p-4">
        <article className="container mx-auto max-w-4xl">
          <ReleaseCard
            excerpt={release.excerpt}
            newIcons={release.newIcons}
            updatedIcons={release.updatedIcons}
            renamedIcons={release.renamedIcons}
            removedIcons={release.removedIcons}
          >
            <ReleaseComponent />
          </ReleaseCard>
        </article>

        <Separator
          orientation="horizontal"
          className="container mx-auto h-px max-w-4xl bg-zinc-950/5 dark:bg-zinc-50/10"
        />

        {(nextRelease || previousRelease) && (
          <div className="container mx-auto max-w-4xl">
            <nav className="@xl2/main:grid-cols-3 grid grid-cols-1 grid-rows-2 gap-1 @md/main:grid-cols-2 @md/main:grid-rows-1">
              {nextRelease && (
                <Link
                  to={`/neo/releases/${nextRelease.slug}`}
                  className={cn(
                    "group grid grid-cols-[min-content_auto] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                    "col-start-1 hover:bg-violet-600 hover:text-white hover:shadow-sm",
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
              )}
              {previousRelease && (
                <Link
                  to={`/neo/releases/${previousRelease.slug}`}
                  className={cn(
                    "group grid grid-cols-[auto_min-content] flex-col gap-2 rounded-sm px-3 py-2 transition-all duration-150",
                    "@xl2/main:col-start-3 hover:bg-violet-600 hover:text-white hover:shadow-sm @md/main:col-start-2",
                  )}
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-zinc-500 duration-150 group-hover:text-white/75">
                      Previous release
                    </span>
                    <span className="font-display my-1 text-end text-xl/5 font-medium">{previousRelease.name}</span>
                  </div>
                  <Amicon
                    icon={aiArrowRight}
                    className="mt-1 text-sm text-zinc-500 duration-150! group-hover:text-white/75"
                  />
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
