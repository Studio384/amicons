import { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { Separator, type NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";
import Amicon, {
  aiBook,
  aiChevronLeft,
  aiChevronRight,
  aiCircleQuestion,
  aiIcons,
  aiMegaphone,
  aiRocket,
} from "@studio384/amicons";

import { DOC_NAV } from "@/neo/app/docs/navigation";

import { NavigationMenu } from "../components/NavigationMenu";

export default function Menu(props: NavigationMenuPrimitive.Root.Props) {
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
    <NavigationMenu.Root {...props}>
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
              <h2 className="mb-2 flex items-center gap-2 px-4 text-sm font-semibold text-zinc-500 not-first:mt-5">
                {section.title}
              </h2>
              <NavigationMenu.List>
                {section.pages.map((page) => {
                  const isActive = location.pathname === page.path;

                  return (
                    <NavigationMenu.Item key={page.path} to={page.path} active={isActive}>
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
          <NavigationMenu.Item to="/neo/icons" active={location.pathname.includes("/neo/icons")}>
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

          <Separator orientation="horizontal" className="my-2 h-px bg-zinc-950/5 dark:bg-white/10" />

          <NavigationMenu.Item to="/neo/error" active={location.pathname.includes("/neo/error")}>
            <Amicon icon={aiCircleQuestion} />
            Error
          </NavigationMenu.Item>
        </NavigationMenu.List>
      )}
    </NavigationMenu.Root>
  );
}
