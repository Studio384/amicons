import { NavLink } from 'react-router';

import Amicon, { aiBluesky, aiGithub, aiHeart, aiStudio384, aiTwitter } from '@studio384/amicons';

import pkg from '../../../../../amicons/package.json';

export default function Footer() {
  return (
    <div className="container m-auto my-4 max-w-7xl px-4">
      <div className="rounded-lg border border-violet-200 bg-violet-100 p-8 text-black">
        <div className="mb-8 grid grid-cols-2 grid-rows-[auto_auto] gap-4 lg:grid-cols-[3fr_1fr_1fr] lg:grid-rows-1">
          <div className="col-span-full mb-4 lg:col-span-1 lg:mb-0">
            <NavLink
              to="/"
              className="flex flex-row items-center gap-2 rounded-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-violet-600"
            >
              <img src="favicon.png" className="size-10" />
              <span className="hiddem font-display text-3xl lg:block">
                Amicons <span className="text-sm font-light opacity-50">v{pkg.version}</span>
              </span>
            </NavLink>
            <p className="mt-2">
              Amicons is a set of SVG icons made with <Amicon icon={aiHeart} /> in Belgium.
            </p>
          </div>
          <div className="-ms-4 lg:ms-0">
            <h2 className="font-display mb-4 ps-2.5 text-lg font-medium">Support</h2>

            <div className="flex flex-col gap-0.5">
              <NavLink
                to="/docs/installation"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                Documentation
              </NavLink>
              <NavLink
                to="/changelog"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                Changelog
              </NavLink>
              <a
                href="https://github.com/Studio384/amicons/issues/new/choose"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                Report a bug
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-display mb-4 ps-2.5 text-lg font-medium">Community</h2>

            <div className="flex flex-col gap-0.5">
              <a
                href="https://github.com/studio384/amicons"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiGithub} /> GitHub
              </a>
              <a
                href="https://bsky.app/profile/studio384.be"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiBluesky} /> Bluesky
              </a>
              <a
                href="https://studio384.be"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiStudio384} /> Studio 384
              </a>
              <a
                href="https://twitter.com/studio384"
                className="flex h-8 items-center gap-2 rounded-sm px-2.5 text-sm hover:bg-violet-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiTwitter} /> Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-end justify-between">
          <a
            href="https://studio384.be"
            className="font-dev text-2xl font-semibold hover:underline hover:decoration-[#78b500] hover:decoration-1 hover:underline-offset-1"
          >
            Studio <span className="bg-linear-to-r from-[#78b500] to-[#00b573] bg-clip-text text-transparent">384</span>{' '}
          </a>
          <p className="text-sm">&copy; 2021-2026</p>
        </div>
      </div>
    </div>
  );
}
