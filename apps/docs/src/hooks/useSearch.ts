import { useCallback, useMemo } from 'react';

import { IAmicon } from '@studio384/amicons';

interface ISeachResults {
  categories: string[];
  component: string;
  icon: IAmicon;
  slug: string;
  tags: string[];
  _score: number;
}

export default function useSearch(
  iconLibrary:
    | {
        categories: string[];
        component: string;
        icon: IAmicon;
        slug: string;
        tags: string[];
      }[]
    | undefined,
  needle: string
) {
  const scoreIcon = useCallback((value: string, query: string) => {
    const searchable = value.toString().toLowerCase().trim();

    // Check if the string is an exact match to this partial search query
    if (searchable === query) {
      return 1;
    }

    // Bonus points if the string starts with the search
    if (searchable.startsWith(query)) {
      return 2 + query.length;
    }

    // Check if the search is included in the item's string, only count if, not how often
    if (searchable.includes(query)) {
      return 4 + query.length;
    }

    return 0;
  }, []);

  const result = useMemo(() => {
    if (needle === '') {
      return iconLibrary || [];
    }

    const results: ISeachResults[] = [];
    const cleanNeedle = needle.trim().toLowerCase();

    // Loop through the haystack
    (iconLibrary || []).map((icon) => {
      let matchScore = 0;

      if (icon.slug) {
        // Do a 1:1 comparison between all searchable items
        matchScore += scoreIcon(icon.slug, cleanNeedle);
        matchScore += scoreIcon(icon.slug.replaceAll('-', ' '), cleanNeedle);
      }

      icon.tags.map((tag) => {
        matchScore += scoreIcon(tag, cleanNeedle);
      });

      // If we have a score, set it
      if (matchScore) {
        results.push({ ...icon, _score: matchScore });
      }
    });

    return results.sort((a, b) => (a._score < b._score ? -1 : 1));
  }, [iconLibrary, needle, scoreIcon]);

  return { result, needle };
}
