import { Separator, type NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";
import Amicon, {
  aiBook,
  aiCircleQuestion,
  aiIcons,
  aiMegaphone,
  aiRocket,
} from "@studio384/amicons";

import { NavigationMenu } from "../components/NavigationMenu";
import { useLocation } from "react-router";

export default function Menu(props: NavigationMenuPrimitive.Root.Props) {
  const location = useLocation();

  return (
    <NavigationMenu.Root {...props}>
      <NavigationMenu.List>
        <NavigationMenu.Item to="/neo/icons" active={location.pathname.includes("/neo/icons")}>
          <Amicon icon={aiIcons} /> Icons
        </NavigationMenu.Item>

        <NavigationMenu.Item
          to="/neo/documentation/installation"
          active={location.pathname.includes("/neo/documentation")}
        >
          <Amicon icon={aiBook} />
          Documentation
        </NavigationMenu.Item>

        <NavigationMenu.Item to="/neo/news" active={location.pathname.includes("/neo/news")}>
          <Amicon icon={aiMegaphone} />
          News
        </NavigationMenu.Item>

        <NavigationMenu.Item
          to="/neo/releases"
          active={location.pathname.includes("/neo/releases")}
        >
          <Amicon icon={aiRocket} />
          Releases
        </NavigationMenu.Item>

        <Separator orientation="horizontal" className="my-2 h-px dark:bg-white/10 bg-zinc-950/5" />

        <NavigationMenu.Item to="/neo/error" active={location.pathname.includes("/neo/error")}>
          <Amicon icon={aiCircleQuestion} />
          Error
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
