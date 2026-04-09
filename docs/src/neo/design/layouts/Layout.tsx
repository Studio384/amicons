import { type PropsWithChildren } from "react";
import { NavLink, Outlet } from "react-router";

import Amicon, { aiBarsUneven, aiXmark } from "@studio384/amicons";

import pkg from "../../../../../amicons/package.json";
import { Drawer } from "../components/Drawer";
import Menu from "./Menu";

export default function NeoLayout({ children }: PropsWithChildren) {
  return (
    <div className="isolate grid min-h-screen bg-zinc-100 max-md:grid-rows-[min-content_auto] md:grid-cols-[300px_auto] dark:bg-zinc-900 dark:text-white">
      <aside className="flex flex-col max-md:items-center max-md:justify-between">
        <header className="flex w-full items-center justify-between p-4 md:border-b md:border-white/10">
          <NavLink to="/neo" className="flex flex-row items-center gap-2">
            <img src="favicon.png" className="size-6 shrink-0" />
            <span className="font-display text-xl">
              Amicons <span className="text-xs font-light opacity-75">{pkg.version}</span>
            </span>
          </NavLink>

          <Drawer.Root swipeDirection="right">
            <Drawer.Trigger className="-my-1 flex size-9 shrink-0 items-center justify-center rounded-sm select-none hover:cursor-pointer hover:bg-zinc-950/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 active:bg-white/15 dark:hover:bg-white/10">
              <Amicon icon={aiBarsUneven} /> <span className="sr-only">Open navigation menu</span>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Viewport>
                <Drawer.Popup>
                  <Drawer.Content className="mx-auto w-full max-w-lg">
                    <div className="flex w-full items-center justify-between border-b border-white/10 p-4">
                      <Drawer.Title>
                        <NavLink to="/neo" className="flex flex-row items-center gap-2">
                          <img src="favicon.png" className="size-6 shrink-0" />
                          <span className="font-display text-xl">
                            Amicons <span className="text-xs font-light opacity-75">{pkg.version}</span>
                          </span>
                        </NavLink>
                      </Drawer.Title>

                      <Drawer.Close className="-my-1 flex size-9 shrink-0 items-center justify-center rounded-sm select-none hover:cursor-pointer hover:bg-zinc-950/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 active:bg-white/15 dark:hover:bg-white/10">
                        <Amicon icon={aiXmark} /> <span className="sr-only">Close navigation menu</span>
                      </Drawer.Close>
                    </div>
                    <Menu className="p-4" />
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
        </header>

        <Menu className="p-4 max-md:hidden" />
      </aside>
      <main className="me-2 mb-2 max-h-[calc(100dvh-1rem)] overflow-auto rounded-sm border border-zinc-200 bg-white p-4 text-black inset-shadow-sm max-md:ms-2 md:mt-2 dark:border-zinc-700 dark:bg-zinc-50">
        {children ? children : <Outlet />}
      </main>
    </div>
  );
}
