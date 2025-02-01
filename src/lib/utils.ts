import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PoemFilter } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLocalStorageFilters(urlSuffix?: string): PoemFilter {
      let filters: PoemFilter = {};

      if (!localStorage) {
        return filters;
      }

      const linesStart = localStorage.getItem("linesStart" + (urlSuffix ?? ""));
      const linesEnd = localStorage.getItem("linesEnd" + (urlSuffix ?? ""));
      const titleText = localStorage.getItem("titleText" + (urlSuffix ?? ""));
      const titleAbs = localStorage.getItem("titleAbs" + (urlSuffix ?? ""));
      const authorText = localStorage.getItem("authorText" + (urlSuffix ?? ""));
      const authorAbs = localStorage.getItem("authorAbs" + (urlSuffix ?? ""));

      if (linesStart && Number.parseInt(linesStart)) {
        filters.linesStart = Number.parseInt(linesStart);
      }

      if (linesEnd && Number.parseInt(linesEnd)) {
        filters.linesEnd = Number.parseInt(linesEnd);
      }

      if (titleText) {
        filters.titleText = titleText;
      }

      if (authorText) {
        filters.authorText = authorText;
      }

      if (titleAbs === "true") {
        filters.titleAbs = true;
      }

      if (authorAbs === "true") {
        filters.authorAbs = true;
      }

      return filters;
    };