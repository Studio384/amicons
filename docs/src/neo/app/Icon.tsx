import { type AnimationEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import Amicon from "@studio384/amicons";

import icons from "@/data/icons";
import IconDetails from "@/neo/design/blocks/IconDetails";
import PageHeader from "@/neo/design/blocks/PageHeader";
import { Drawer } from "@/neo/design/components/Drawer";
import { ICONS_PATH, clearOpenedFromGrid, getOpenedFromGridSlug } from "@/neo/routes";
import { type IIcon, type ILibraryIcon } from "@/types";

function IconDrawer({ icon, title, onClose }: { icon: ILibraryIcon; title: string; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  function requestClose() {
    if (closing) return;

    setClosing(true);

    timeout.current = setTimeout(onClose, 360);
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName === "ai-drawer-exit") {
      clearTimeout(timeout.current);
      onClose();
    }
  }

  return (
    <Drawer.Root
      open
      swipeDirection="right"
      onOpenChange={(next) => {
        if (!next) requestClose();
      }}
    >
      <Drawer.Portal closing={closing}>
        <Drawer.Viewport>
          <Drawer.Popup
            width="lg"
            onAnimationEnd={handleAnimationEnd}
            className={closing ? "animate-drawer-exit" : "animate-drawer-enter"}
          >
            <Drawer.Content>
              <IconDetails icon={icon} title={title} onClose={requestClose} />
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default function IconViewer() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const icon = icons.find((entry) => entry.slug === slug);
  const [meta, setMeta] = useState<IIcon | null>(null);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;

    fetch(`data/icons/${slug}.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: IIcon | null) => {
        if (!cancelled) setMeta(data);
      })
      .catch(() => {
        if (!cancelled) setMeta(null);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!icon) {
    return null;
  }

  const openedFromGrid = getOpenedFromGridSlug() === icon.slug;
  const title = meta?.title ?? icon.slug;

  function close() {
    clearOpenedFromGrid();
    navigate({ pathname: ICONS_PATH, search: location.search });
  }

  if (openedFromGrid) {
    return <IconDrawer icon={icon} title={title} onClose={close} />;
  }

  return (
    <>
      <PageHeader icon={icon.icon} title={title} subtitle="Icon" />

      <div className="flex flex-col gap-4 p-4">
        <article className="container mx-auto max-w-4xl overflow-hidden rounded-sm border border-zinc-950/10 dark:border-white/10">
          <IconDetails icon={icon} title={title} />
        </article>

        <p className="container mx-auto flex max-w-4xl flex-row items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Amicon icon={icon.icon} className="size-4" />
          <span>
            Referenced as <code className="font-mono">{icon.component}</code>
          </span>
        </p>
      </div>
    </>
  );
}
