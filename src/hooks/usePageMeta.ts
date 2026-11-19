import { useEffect } from "react";
import { siteUrl } from "../data/site";

/**
 * Keeps the document title and canonical/OG URL in sync with the active route,
 * so search engines see the right URL for each page of the single-page app.
 */
export function usePageMeta(title: string, path: string): void {
  useEffect(() => {
    document.title = title;

    const url = new URL(path, siteUrl).href;

    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", url);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document
      .querySelector<HTMLMetaElement>('meta[property="og:title"]')
      ?.setAttribute("content", title);
  }, [title, path]);
}
