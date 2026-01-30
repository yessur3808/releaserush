import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./ga4";

export function useGaPageViews() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    trackPageView(path);
  }, [location.pathname, location.search]);
}
