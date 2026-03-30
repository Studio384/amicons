import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router";

import { useDebouncedCallback } from "@tanstack/react-pacer";

export function useFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initial = {
    page: 1,
    search: "",
    categories: [] as string[],
  };

  const [searchValue, setSearchValue] = useState("");

  const query = useMemo(() => {
    const page = Number(searchParams.get("page") ?? initial.page);
    const search = searchParams.get("search") ?? initial.search;
    const categories = searchParams.getAll("categories");

    return { page, search, categories };
  }, [searchParams, initial.page, initial.search]);

  const debouncedUpdate = useDebouncedCallback(
    (updater: (params: URLSearchParams) => void) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        updater(next);
        return next;
      });
    },
    { wait: 300 },
  );

  const setPage = useCallback(
    (page: number) => {
      debouncedUpdate((params) => params.set("page", String(page)));
    },
    [debouncedUpdate],
  );

  const setSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedUpdate((params) => {
        params.set("page", "1");
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
      });
    },
    [debouncedUpdate],
  );

  const toggleCategory = useCallback(
    (category: string) => {
      debouncedUpdate((params) => {
        params.set("page", "1");

        const current = params.getAll("categories");
        const exists = current.includes(category);

        params.delete("categories");

        const nextValue = exists ? current.filter((_category) => _category !== category) : [...current, category];

        nextValue.forEach((_category) => params.append("categories", _category));
      });
    },
    [debouncedUpdate],
  );

  const resetQuery = useCallback(() => {
    debouncedUpdate((params) => {
      params.set("page", String(initial.page));

      params.delete("search");
      params.delete("page");
      params.delete("categories");
      setSearchValue("");
    });
  }, [debouncedUpdate, initial.page]);

  return {
    query,
    searchValue,
    setPage,
    setSearch,
    toggleCategory,
    resetQuery,
  };
}
