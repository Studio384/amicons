import { NavLink, useLocation } from "react-router";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";
import Amicon, {
  aiBarsStaggered,
  aiBarsUneven,
  aiBluesky,
  aiBook,
  aiGithub,
  aiIcons,
  aiMegaphone,
  aiPatreon,
  aiRocket,
} from "@studio384/amicons";
import clsx from "clsx";

import { NavigationMenu } from "@/design/components/NavigationMenu";

import pkg from "../../../../../amicons/package.json";

const navigationLinks = [
  {
    icon: aiIcons,
    to: "/",
    title: "Icons",
    description: "Find the icon you need.",
    active: (pathname: string) => pathname === "/" || pathname.startsWith("/icons"),
  },
  {
    icon: aiBook,
    to: "/docs/installation",
    title: "Docs",
    description: "Get started with Amicons.",
    active: (pathname: string) => pathname.startsWith("/docs"),
  },
  {
    icon: aiMegaphone,
    to: "/blog",
    title: "Blog",
    description: "Read the latest news.",
    active: (pathname: string) => pathname.startsWith("/blog"),
  },
  {
    icon: aiRocket,
    to: "/releases",
    title: "Releases",
    description: "Take a look at what's new.",
    active: (pathname: string) => pathname.startsWith("/releases"),
  },
] as const;

export default function Navbar() {
  const location = useLocation();

  return (
    <>
      <div className="sticky top-0 z-50 container m-auto max-w-7xl px-4 py-4">
        <NavigationMenuPrimitive.Root className="grid h-15 grid-cols-[repeat(2,auto)] items-center justify-between rounded-lg border border-violet-400/90 bg-violet-400/90 px-3.5 backdrop-blur-sm backdrop-saturate-200 md:grid-cols-3 dark:border-violet-900/90 dark:bg-violet-900/90">
          <NavigationMenuPrimitive.List className="flex justify-start gap-1 max-md:hidden">
            <NavigationMenuPrimitive.Item>
              <NavLink
                to="/"
                className="flex flex-row items-center gap-2 rounded-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-violet-600"
              >
                <img src="favicon.png" className="size-6 shrink-0" />
                <span className="font-display hidden text-xl md:block">
                  Amicons <span className="text-sm font-light opacity-75">v{pkg.version}</span>
                </span>
              </NavLink>
            </NavigationMenuPrimitive.Item>
          </NavigationMenuPrimitive.List>
          <NavigationMenu.List className="justify-start md:hidden">
            <NavigationMenuPrimitive.Item>
              <NavigationMenuPrimitive.Trigger
                className={clsx(
                  "font-display flex h-9 items-center justify-center gap-2 rounded-sm px-2.5 text-sm font-medium text-white hover:bg-violet-500 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500",
                  "active:bg-violet-500 data-popup-open:bg-violet-500",
                )}
              >
                <Amicon icon={aiBarsUneven} className="me-2" />

                <img src="favicon.png" className="size-6 shrink-0" />
                <span className="font-display text-xl">
                  Amicons{" "}
                  <span className="hidden text-sm font-light opacity-75 md:inline">
                    v{pkg.version}
                  </span>
                </span>
              </NavigationMenuPrimitive.Trigger>

              <NavigationMenuPrimitive.Content
                className={clsx(
                  "h-full w-[calc(100vw-40px)] p-2 [@media(min-width:32rem)]:w-max [@media(min-width:32rem)]:min-w-100 transition-[opacity,transform,translate] duration-(--duration) ease-(--easing) data-ending-style:opacity-0 data-starting-style:opacity-0 data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%]",
                )}
              >
                <ul className="grid list-none grid-cols-1 gap-1">
                  {navigationLinks.map((item) => (
                    <li key={item.to}>
                      <NavigationMenuPrimitive.Link
                        closeOnClick
                        render={<NavLink to={item.to} />}
                        className={clsx(
                          "flex flex-row gap-2 rounded-md p-2 text-inherit no-underline [@media(min-width:32rem)]:p-3 hover:bg-violet-300 focus-visible:relative focus-visible:outline-2 dark:hover:bg-violet-700 focus-visible:-outline-offset-1 focus-visible:outline-violet-800",
                        )}
                      >
                        <Amicon icon={item.icon} className="mt-0.75" />
                        <span>
                          <h3 className="m-0 mb-1 text-base leading-5 font-semibold">
                            {item.title}
                          </h3>
                          <p className="m-0 text-sm leading-5 text-zinc-700 dark:text-violet-200">
                            {item.description}
                          </p>
                        </span>
                      </NavigationMenuPrimitive.Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuPrimitive.Content>
            </NavigationMenuPrimitive.Item>
          </NavigationMenu.List>
          <NavigationMenu.List className="justify-center max-md:hidden">
            {navigationLinks.map((item) => (
              <NavigationMenu.Item
                key={item.to}
                label={item.title}
                to={item.to}
                active={item.active(location.pathname)}
              />
            ))}
          </NavigationMenu.List>
          <NavigationMenu.List className="justify-end">
            <NavigationMenu.Social
              to="https://www.patreon.com/cw/Amicons"
              icon={aiPatreon}
              label="Support us on Patreon"
            />
            <NavigationMenu.Social
              to="https://bsky.app/profile/studio384.be"
              icon={aiBluesky}
              label="Studio384.be on Bluesky"
            />
            <NavigationMenu.Social
              to="https://github.com/studio384/amicons"
              icon={aiGithub}
              label="GitHub repository"
            />
          </NavigationMenu.List>

          <NavigationMenuPrimitive.Portal>
            <NavigationMenuPrimitive.Positioner
              sideOffset={10}
              collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
              collisionAvoidance={{ side: "none" }}
              className="box-border h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:-top-2.5 data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=left]:before:top-0 data-[side=left]:before:-right-2.5 data-[side=left]:before:bottom-0 data-[side=left]:before:w-2.5 data-[side=right]:before:top-0 data-[side=right]:before:bottom-0 data-[side=right]:before:-left-2.5 data-[side=right]:before:w-2.5 data-[side=top]:before:right-0 data-[side=top]:before:-bottom-2.5 data-[side=top]:before:left-0 data-[side=top]:before:h-2.5"
              style={{
                ["--duration" as string]: "0.35s",
                ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <NavigationMenuPrimitive.Popup className="data-ending-style:easing-[ease] relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg bg-violet-200 text-zinc-900 shadow-lg outline-1 outline-zinc-200 transition-[opacity,transform,width,height,scale,translate] duration-(--duration) ease-(--easing) data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0 dark:bg-violet-900 dark:text-white dark:shadow-none dark:-outline-offset-1 dark:outline-violet-800">
                <NavigationMenuPrimitive.Viewport className="relative h-full w-full overflow-hidden" />
              </NavigationMenuPrimitive.Popup>
            </NavigationMenuPrimitive.Positioner>
          </NavigationMenuPrimitive.Portal>
        </NavigationMenuPrimitive.Root>
      </div>
    </>
  );
}
