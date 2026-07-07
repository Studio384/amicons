import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { Separator } from "@base-ui/react";
import Amicon, {
  aiBluesky,
  aiBook,
  aiChevronLeft,
  aiChevronRight,
  aiGithub,
  aiIcons,
  aiMegaphone,
  aiPatreon,
  aiRocket,
  aiTwitter,
} from "@studio384/amicons";

import { DOC_NAV } from "@/neo/app/docs/navigation";
import { cn } from "@/utils/cn";

import { NavigationMenu } from "../components/NavigationMenu";

export default function Menu(props: React.HTMLAttributes<HTMLDivElement>) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDocumentationRoute = location.pathname.startsWith("/neo/documentation");
  const [view, setView] = useState<"primary" | "documentation">(isDocumentationRoute ? "documentation" : "primary");
  const previousPathname = useRef(location.pathname);

  useEffect(() => {
    const wasDocumentationRoute = previousPathname.current.startsWith("/neo/documentation");

    if (!wasDocumentationRoute && isDocumentationRoute) {
      setView("documentation");
    }

    if (!isDocumentationRoute) {
      setView("primary");
    }

    previousPathname.current = location.pathname;
  }, [isDocumentationRoute, location.pathname]);

  function openDocumentationNavigation() {
    setView("documentation");

    if (!isDocumentationRoute) {
      navigate("/neo/documentation/installation");
    }
  }

  return (
    <div className={cn(props.className, "flex w-full grow flex-col justify-between overflow-y-auto p-4")}>
      <NavigationMenu.Root>
        {view === "documentation" ? (
          <nav aria-label="Documentation navigation">
            <NavigationMenu.List>
              <NavigationMenu.ActionItem onClick={() => setView("primary")}>
                <Amicon icon={aiChevronLeft} />
                Back
              </NavigationMenu.ActionItem>
            </NavigationMenu.List>
            {DOC_NAV.map((section) => (
              <Fragment key={section.title}>
                <span className="mb-2 flex items-center gap-2 px-4 text-base font-semibold text-zinc-500 not-first:mt-5">
                  {section.title}
                </span>
                <NavigationMenu.List>
                  {section.pages.map((page) => {
                    const isActive = location.pathname === page.path;

                    return (
                      <NavigationMenu.Item key={page.path} to={page.path} size="sm" active={isActive}>
                        <Amicon icon={page.icon} />
                        {page.title}
                      </NavigationMenu.Item>
                    );
                  })}
                </NavigationMenu.List>
              </Fragment>
            ))}
          </nav>
        ) : (
          <NavigationMenu.List>
            <NavigationMenu.Item
              to="/neo/icons"
              active={
                location.pathname === "/neo" ||
                location.pathname === "/neo/" ||
                location.pathname.includes("/neo/icons")
              }
            >
              <Amicon icon={aiIcons} /> Icons
            </NavigationMenu.Item>

            <NavigationMenu.ActionItem active={isDocumentationRoute} onClick={openDocumentationNavigation}>
              <Amicon icon={aiBook} />
              Documentation
              <Amicon icon={aiChevronRight} />
            </NavigationMenu.ActionItem>

            <NavigationMenu.Item to="/neo/news" active={location.pathname.includes("/neo/news")}>
              <Amicon icon={aiMegaphone} />
              News
            </NavigationMenu.Item>

            <NavigationMenu.Item to="/neo/releases" active={location.pathname.includes("/neo/releases")}>
              <Amicon icon={aiRocket} />
              Releases
            </NavigationMenu.Item>
          </NavigationMenu.List>
        )}

        <Separator orientation="horizontal" className="my-2 h-px bg-zinc-950/5 dark:bg-zinc-50/10" />

        <div className="flex shrink-0 flex-row gap-1">
          <a
            href="https://patreon.com/amicons"
            target="_blank"
            rel="noopener noreferrer"
            className="font-display flex h-11 shrink-0 grow items-center justify-center gap-3 rounded-sm outline-indigo-600 transition-all select-none hover:cursor-pointer hover:bg-white hover:text-black hover:shadow-sm focus-visible:outline-2 focus-visible:-outline-offset-2 active:bg-white"
          >
            <Amicon icon={aiPatreon} /> Support us
          </a>
          <a
            href="https://bsky.app/profile/studio384.be"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 shrink-0 items-center justify-center gap-3 rounded-sm outline-indigo-600 transition-all select-none hover:cursor-pointer hover:bg-blue-600 hover:text-white hover:shadow-sm focus-visible:outline-2 focus-visible:-outline-offset-2 active:bg-blue-600"
          >
            <Amicon icon={aiBluesky} /> <span className="sr-only">Follow us</span>
          </a>
          <a
            href="https://twitter.com/studio384"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 shrink-0 items-center justify-center gap-3 rounded-sm outline-indigo-600 transition-all select-none hover:cursor-pointer hover:bg-blue-500 hover:text-white hover:shadow-sm focus-visible:outline-2 focus-visible:-outline-offset-2 active:bg-blue-500"
          >
            <Amicon icon={aiTwitter} /> <span className="sr-only">Follow us</span>
          </a>
          <a
            href="https://github.com/studio384/amicons"
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 shrink-0 items-center justify-center gap-3 rounded-sm outline-indigo-600 transition-all select-none hover:cursor-pointer hover:bg-black hover:text-white hover:shadow-sm focus-visible:outline-2 focus-visible:-outline-offset-2 active:bg-black"
          >
            <Amicon icon={aiGithub} /> <span className="sr-only">Help us</span>
          </a>
        </div>
      </NavigationMenu.Root>

      <div className="flex flex-row items-end justify-between">
        <a
          href="https://studio384.be"
          className="font-dev text-2xl font-semibold hover:underline hover:decoration-[#78b500] hover:decoration-1 hover:underline-offset-1"
        >
          Studio <span className="bg-linear-to-r from-[#78b500] to-[#00b573] bg-clip-text text-transparent">384</span>
        </a>
        <p className="font-display text-xs text-zinc-500">&copy; 2021-2026</p>
      </div>
    </div>
  );
}
