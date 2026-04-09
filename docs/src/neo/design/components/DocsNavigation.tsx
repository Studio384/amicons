import { Fragment } from "react";
import { useLocation } from "react-router";

import Amicon, { aiChevronLeft } from "@studio384/amicons";

import { DOC_NAV } from "../../app/docs/navigation";
import { NavigationMenu } from "./NavigationMenu";

export default function DocsNavigation({ onBack }: { onBack?: () => void }) {
  const location = useLocation();

  return (
    <nav aria-label="Documentation navigation">
      {onBack ? (
        <NavigationMenu.List>
          <NavigationMenu.ActionItem onClick={onBack}>
            <Amicon icon={aiChevronLeft} />
            Back
          </NavigationMenu.ActionItem>
        </NavigationMenu.List>
      ) : null}
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
  );
}
