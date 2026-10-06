import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router";

import { Input } from "@base-ui/react";
import Amicon, { aiFilterXmark, aiHouse, aiMagnifyingGlass } from "@studio384/amicons";
import { useDebouncer } from "@tanstack/react-pacer";

import categories from "@/data/categories";
import icons from "@/data/icons";
import PageHeader from "@/design/blocks/PageHeader";
import { IconCard } from "@/design/components/IconCard";
import { Pagination } from "@/design/components/Pagination";
import { getOpenedFromGridSlug, getSlugFromPath } from "@/routes";
import { cn } from "cn";

const PAGE_SIZE = 98;

export default function NeoIcons() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

  const searchQuery = searchParams.get("search") ?? "";
  const selectedCategories = searchParams.getAll("categories");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);

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

  const searchDebouncer = useDebouncer(
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
      searchDebouncer.maybeExecute(value);
    },
    [searchDebouncer],
  );

  const toggleCategory = useCallback(
    (category: string) => {
      updateParams((params) => {
        const current = params.getAll("categories");
        const exists = current.includes(category);
        const next = exists ? current.filter((item) => item !== category) : [...current, category];

        params.delete("categories");
        next.forEach((item) => params.append("categories", item));
        params.delete("page");
      });
    },
    [updateParams],
  );

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedCategories.length > 0;

  const resetFilters = useCallback(() => {
    setSearchInput("");
    searchDebouncer.cancel();

    updateParams((params) => {
      params.delete("search");
      params.delete("categories");
      params.delete("page");
    });
  }, [searchDebouncer, updateParams]);

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

  const pageCount = Math.max(1, Math.ceil(filteredIcons.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paginatedIcons = useMemo(
    () => filteredIcons.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredIcons, currentPage],
  );

  const setPage = useCallback(
    (next: number) => {
      updateParams((params) => {
        if (next <= 1) {
          params.delete("page");
        } else {
          params.set("page", String(next));
        }
      });
    },
    [updateParams],
  );

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

  const openedSlug = getSlugFromPath(location.pathname);
  const showGrid = !openedSlug || getOpenedFromGridSlug() === openedSlug;

  return (
    <>
      {showGrid && (
        <>
          <PageHeader
            icon={aiHouse}
            title="Icons"
            subtitle={`${filteredIcons.length} icon${filteredIcons.length !== 1 ? "s" : ""}`}
            width="lg"
          />

          <div className="flex flex-col gap-4 p-4">
            <div className="neo-docs neo-doc-page container mx-auto grid max-w-7xl grid-cols-[240px_auto] items-start gap-3">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  <div className="flex h-9 flex-1 flex-row items-center gap-2 rounded-sm border border-zinc-950/10 bg-zinc-50 px-2 outline-0 transition-all focus-within:border-violet-700/15 focus-within:bg-violet-100 dark:border-white/10 dark:bg-zinc-950 dark:focus-within:bg-violet-600/20">
                    <Amicon icon={aiMagnifyingGlass} className="shrink-0 text-zinc-400" />
                    <Input
                      placeholder="Search icons by name or tag..."
                      value={searchInput}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="h-full w-full border-0 bg-transparent px-0 outline-0"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                    title="Reset filters"
                    className={cn(
                      "font-display grid size-9 shrink-0 place-items-center rounded-sm border border-zinc-950/10 bg-zinc-50",
                      "outline-0 -outline-offset-2 outline-violet-600 transition-all",
                      "hover:cursor-pointer hover:bg-violet-600 hover:text-white hover:shadow-sm focus-visible:outline-2",
                      "disabled:pointer-events-none disabled:opacity-40",
                      "dark:border-white/10 dark:bg-zinc-950",
                    )}
                  >
                    <Amicon icon={aiFilterXmark} />
                    <span className="sr-only">Reset filters</span>
                  </button>
                </div>

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
              </div>

              {filteredIcons.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="icon-grid grid grid-cols-[repeat(auto-fill,minmax(min(8rem,100%),1fr))] gap-1">
                    {paginatedIcons.map((icon) => (
                      <IconCard key={icon.slug} icon={icon} openAsDrawer />
                    ))}
                  </div>

                  <Pagination page={currentPage} count={pageCount} onChange={setPage} />
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-sm border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                  <p className="font-display text-3xl text-zinc-700 dark:text-zinc-500">No icons found</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}
