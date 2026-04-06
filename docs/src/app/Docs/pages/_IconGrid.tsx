import { useMemo } from "react";

import iconsData from "@/data/icons";
import { IconCard } from "@/design/components/IconCard";
import { type ILibraryIcon } from "@/types";

type ReleaseProps = {
  icons: string[];
};

// Release component
export default function IconGrid({ icons }: ReleaseProps) {
  const iconList = useMemo(() => iconsData.filter((icon) => icons?.includes(icon.slug)), [icons]);

  return (
    <div className="icon-grid grid grid-cols-[repeat(auto-fill,minmax(min(9rem,100%),1fr))] gap-2">
      {iconList.map((icon: ILibraryIcon) => (
        <IconCard key={icon.slug} icon={icon} />
      ))}
    </div>
  );
}
