import { NavLink, useLocation } from 'react-router';

import { NavigationMenu } from '@base-ui/react';
import Amicon, { aiGithub, aiStudio384 } from '@studio384/amicons';
import clsx from 'clsx';

import pkg from '../../../../../amicons/package.json';

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="sticky top-0 z-50 container m-auto mb-2 w-7xl px-4 pt-2">
        <NavigationMenu.Root className="grid grid-cols-3 items-center justify-between rounded-2xl border border-indigo-400/90 bg-indigo-400/90 px-3.5 py-3 backdrop-blur-sm backdrop-saturate-200">
          <NavigationMenu.List className="flex justify-start gap-1">
            <NavigationMenu.Item>
              <NavLink
                to="/"
                className="flex flex-row items-center gap-2 rounded-md font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-indigo-600"
              >
                <img src="favicon.png" className="size-6" />
                <span className="hiddem font-display text-xl lg:block">
                  Amicons <span className="text-sm font-light opacity-50">v{pkg.version}</span>
                </span>
              </NavLink>
            </NavigationMenu.Item>
          </NavigationMenu.List>
          <NavigationMenu.List className="flex justify-center gap-1">
            <NavigationMenu.Item>
              <NavLink
                to="/"
                className={clsx(
                  'font-display flex h-8 items-center justify-center rounded-md px-2.5 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500',
                  {
                    'bg-indigo-500 hover:bg-indigo-600 focus-visible:outline-indigo-600': location?.pathname === '/' || location?.pathname?.startsWith('/icons')
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
                  'font-display flex h-8 items-center justify-center rounded-md px-2.5 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500',
                  {
                    'bg-indigo-500 hover:bg-indigo-600 focus-visible:outline-indigo-600': location?.pathname?.startsWith('/docs')
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
                  'font-display flex h-8 items-center justify-center rounded-md px-2.5 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500',
                  {
                    'bg-indigo-500 hover:bg-indigo-600 focus-visible:outline-indigo-600': location?.pathname?.startsWith('/changelog')
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
                className="flex size-8 items-center justify-center rounded-md text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500"
              >
                <Amicon icon={aiStudio384} /> <span className="sr-only">Studio 384</span>
              </a>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <a
                href="https://github.com/studio384/amicons"
                target="_blank"
                className="flex size-8 items-center justify-center rounded-md text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500"
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
