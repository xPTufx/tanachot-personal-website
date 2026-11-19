import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets scroll position when the route changes. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
