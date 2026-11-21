import { useEffect, useState } from "react";

export type Route =
  | "/"
  | "/services"
  | "/business"
  | "/cities"
  | "/about"
  | "/contact"
  | "/privacy"
  | "/terms";

const VALID: Route[] = ["/", "/services", "/business", "/cities", "/about", "/contact", "/privacy", "/terms"];

function parseHash(): Route {
  const h = window.location.hash.replace(/^#/, "");
  const path = h.startsWith("/") ? h : h ? `/${h}` : "/";
  return (VALID as string[]).includes(path) ? (path as Route) : "/";
}

export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(parseHash);
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const navigate = (r: Route) => {
    window.location.hash = r === "/" ? "#/" : `#${r}`;
  };
  return [route, navigate];
}
