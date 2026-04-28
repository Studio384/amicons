import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { Input } from "@base-ui/react";
import Amicon, { aiHouse, aiXmark, aiMagnifyingGlass } from "@studio384/amicons";
import { useDebouncedCallback } from "@tanstack/react-pacer";

import categories from "@/data/categories";
import icons from "@/data/icons";
import { Drawer } from "@/neo/design/components/Drawer";
import { IconCard } from "@/neo/design/components/IconCard";
import { type ILibraryIcon } from "@/types";
import { cn } from "@/utils/cn";

export default function NeoIcons() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

  const searchQuery = searchParams.get("search") ?? "";
  const selectedCategories = searchParams.getAll("categories");
  const openedIconSlug = searchParams.get("icon");

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const updateParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        updater(next);
        return next;
      });
    },
    [setSearchParams],
  );

  const debouncedSearchUpdate = useDebouncedCallback(
    (value: string) => {
      updateParams((params) => {
        if (value.trim()) {
          params.set("search", value.trim());
        } else {
          params.delete("search");
        }
      });
    },
    { wait: 250 },
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      debouncedSearchUpdate(value);
    },
    [debouncedSearchUpdate],
  );

  const toggleCategory = useCallback(
    (category: string) => {
      updateParams((params) => {
        const current = params.getAll("categories");
        const exists = current.includes(category);
        const next = exists ? current.filter((item) => item !== category) : [...current, category];

        params.delete("categories");
        next.forEach((item) => params.append("categories", item));
      });
    },
    [updateParams],
  );

  const searchedIcons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return icons;
    }

    return icons.filter((icon) => {
      const searchable = [icon.slug, icon.slug.replaceAll("-", " "), icon.component, ...icon.tags, ...icon.categories];
      return searchable.some((value) => value.toLowerCase().includes(query));
    });
  }, [searchQuery]);

  const filteredIcons = useMemo(() => {
    if (selectedCategories.length === 0) {
      return searchedIcons;
    }

    return searchedIcons.filter((icon) =>
      selectedCategories.every((category) => (icon.categories as string[]).includes(category)),
    );
  }, [searchedIcons, selectedCategories]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    categories.forEach((category) => {
      const requiredCategories = selectedCategories.includes(category.slug)
        ? selectedCategories
        : [...selectedCategories, category.slug];

      const count = searchedIcons.filter((icon) =>
        requiredCategories.every((required) => (icon.categories as string[]).includes(required)),
      ).length;

      counts.set(category.slug, count);
    });

    return counts;
  }, [searchedIcons, selectedCategories]);

  const selectedIcon: ILibraryIcon | null = useMemo(
    () => icons.find((icon) => icon.slug === openedIconSlug) ?? null,
    [openedIconSlug],
  );

  const handleDrawerOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        updateParams((params) => {
          params.delete("icon");
        });
      }
    },
    [updateParams],
  );

  return (
    <>
      <div className="sticky -top-18 isolate z-10 overflow-hidden bg-white/80 bg-origin-border p-4 shadow-sm backdrop-blur-xs dark:bg-zinc-900/80">
        <div className="z-10 container mx-auto max-w-7xl">
          <div className="flex h-6 flex-row items-center gap-2">
            <Amicon icon={aiMagnifyingGlass} className="text-zinc-400" />
            <Input
              placeholder="Search icons by name or tag..."
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full border-0 bg-transparent px-0 outline-0"
            />
          </div>

          <div className="mt-12 flex flex-row items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-sm bg-violet-500 text-2xl text-white shadow-sm">
              <Amicon icon={aiHouse} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-display -mb-1 text-3xl font-bold">Icon Explorer</h1>
              <p className="font-display -mt-1 mb-0.5 text-sm font-medium tracking-widest text-violet-700 uppercase">
                {filteredIcons.length} icon{filteredIcons.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="neo-docs neo-doc-page container mx-auto grid max-w-7xl grid-cols-[240px_auto] items-start gap-3">
          <div className="flex flex-col gap-0.5">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => toggleCategory(category.slug)}
                className={cn(
                  "group grid grid-cols-[min-content_auto_min-content] items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-start text-sm font-medium outline-0 -outline-offset-2 outline-violet-600 transition-[color,background-color,box-shadow] hover:cursor-pointer hover:bg-violet-600 hover:text-white hover:shadow-sm focus-visible:outline-2",
                  selectedCategories.includes(category.slug) && "bg-violet-600 text-white",
                  categoryCounts.get(category.slug) === 0 &&
                    "not-data-active:text-zinc-400 not-data-active:hover:text-violet-200",
                )}
                data-active={selectedCategories.includes(category.slug) ? "true" : undefined}
              >
                <Amicon
                  icon={category.icon}
                  className="text-base text-violet-800 group-hover:text-white group-data-active:text-white"
                />
                <span className="font-display truncate">{category.title}</span>
                <span
                  className="font-display text-violet-600 tabular-nums group-hover:text-white group-data-active:text-white group-not-data-active:data-zero:text-zinc-400 group-hover:group-not-data-active:data-zero:text-violet-200"
                  data-zero={categoryCounts.get(category.slug) === 0 ? "true" : undefined}
                >
                  {categoryCounts.get(category.slug) ?? 0}
                </span>
              </button>
            ))}
          </div>

          {filteredIcons.length > 0 ? (
            <div className="icon-grid grid grid-cols-[repeat(auto-fill,minmax(min(8rem,100%),1fr))] gap-1">
              {filteredIcons.map((icon) => (
                <IconCard key={icon.slug} icon={icon} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-sm border-2 border-dashed border-zinc-300">
              <p className="font-display text-3xl text-zinc-700">No icons found</p>
            </div>
          )}
        </div>

        <Drawer.Root open={Boolean(selectedIcon)} onOpenChange={handleDrawerOpenChange}>
          <Drawer.Portal>
            <Drawer.Viewport>
              <Drawer.Popup>
                {selectedIcon && (
                  <Drawer.Content className="flex flex-col gap-6 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Amicon
                          icon={selectedIcon.icon}
                          className="mb-4 text-5xl text-violet-600 dark:text-violet-400"
                        />
                        <h2 className="font-display text-2xl font-medium text-zinc-900 dark:text-white">
                          {selectedIcon.slug}
                        </h2>
                      </div>
                      <Drawer.Close className="flex size-8 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white">
                        <Amicon icon={aiXmark} className="text-lg" />
                      </Drawer.Close>
                    </div>

                    {selectedIcon.categories.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedIcon.categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => toggleCategory(category)}
                              className="rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-600 hover:bg-violet-200 dark:bg-violet-900 dark:text-violet-300 dark:hover:bg-violet-800"
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedIcon.tags.length > 0 && (
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedIcon.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">Component</h3>
                      <code className="rounded bg-zinc-900 px-3 py-2 font-mono text-xs text-zinc-100">
                        {selectedIcon.component}
                      </code>
                    </div>
                  </Drawer.Content>
                )}
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  );
}
