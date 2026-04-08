import { type NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react";
import Amicon, { aiBook, aiIcons, aiMegaphone, aiRocket } from "@studio384/amicons";

import { NavigationMenu } from "../components/NavigationMenu";

export default function Menu(props: NavigationMenuPrimitive.Root.Props) {
  return (
    <NavigationMenu.Root {...props}>
      <NavigationMenu.List>
        <NavigationMenu.Item to="/neo/icons" active>
          <Amicon icon={aiIcons} /> Icons
        </NavigationMenu.Item>

        <NavigationMenu.Item to="/neo/documentation/installation">
          <Amicon icon={aiBook} />
          Documentation
        </NavigationMenu.Item>

        <NavigationMenu.Item to="/neo/news">
          <Amicon icon={aiMegaphone} />
          News
        </NavigationMenu.Item>

        <NavigationMenu.Item to="/neo/releases">
          <Amicon icon={aiRocket} />
          Releases
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
