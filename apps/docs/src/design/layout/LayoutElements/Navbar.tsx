import { NavLink, useLocation } from 'react-router';

import { NavigationMenu } from '@base-ui/react';
import Amicon, { aiBluesky, aiGithub, aiStudio384 } from '@studio384/amicons';
import clsx from 'clsx';

import pkg from '../../../../../../packages/amicons/package.json';

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="sticky top-0 z-50 container m-auto max-w-7xl px-4 py-4">
        <NavigationMenu.Root className="grid h-15 grid-cols-[repeat(3,auto)] items-center justify-between rounded-lg border border-violet-400/90 bg-violet-400/90 px-3.5 backdrop-blur-sm backdrop-saturate-200 md:grid-cols-3">
          <NavigationMenu.List className="flex justify-start gap-1">
            <NavigationMenu.Item>
              <NavLink
                to="/"
                className="flex flex-row items-center gap-2 rounded-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-violet-600"
              >
                <img src="favicon.png" className="size-6" />
                <span className="font-display hidden text-xl md:block">
                  Amicons <span className="text-sm font-light opacity-75">v{pkg.version}</span>
                </span>
              </NavLink>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.List className="flex justify-center gap-1">
            <NavigationMenu.Item>
              <NavLink
                to="/"
                className={clsx(
                  'font-display flex h-8 items-center justify-center rounded-sm px-2.5 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500',
                  {
                    'bg-violet-500 hover:bg-violet-600 focus-visible:outline-violet-700': location?.pathname === '/' || location?.pathname?.startsWith('/icons')
                  }
                )}
              >
                Home
              </NavLink>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavLink
                to="/docs/installation"
                className={clsx(
                  'font-display flex h-8 items-center justify-center rounded-sm px-2.5 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500',
                  {
                    'bg-violet-500 hover:bg-violet-600 focus-visible:outline-violet-700': location?.pathname?.startsWith('/docs')
                  }
                )}
              >
                Docs
              </NavLink>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavLink
                to="/changelog"
                className={clsx(
                  'font-display flex h-8 items-center justify-center rounded-sm px-2.5 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500',
                  {
                    'bg-violet-500 hover:bg-violet-600 focus-visible:outline-violet-700': location?.pathname?.startsWith('/changelog')
                  }
                )}
              >
                Changelog
              </NavLink>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.List className="flex justify-end gap-1">
            <NavigationMenu.Item>
              <a
                href="https://studio384.be"
                target="_blank"
                className="flex size-8 items-center justify-center rounded-sm text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiStudio384} /> <span className="sr-only">Studio 384</span>
              </a>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <a
                href="https://bsky.app/profile/studio384.be"
                target="_blank"
                className="flex size-8 items-center justify-center rounded-sm text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiBluesky} /> <span className="sr-only">Studio384.be on Bluesky</span>
              </a>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <a
                href="https://github.com/studio384/amicons"
                target="_blank"
                className="flex size-8 items-center justify-center rounded-sm text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500"
              >
                <Amicon icon={aiGithub} /> <span className="sr-only">GitHub repository</span>
              </a>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </>
  );
}
