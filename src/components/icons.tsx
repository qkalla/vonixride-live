export type IconName = "ride" | "food" | "grocery" | "pharmacy" | "cargo" | "moped";

const PATHS: Record<IconName, string> = {
  ride: "M5 16l1.5-5A2 2 0 0 1 8.4 9.5h7.2a2 2 0 0 1 1.9 1.5L19 16m-14 0h14a1 1 0 0 1 1 1v2h-2v-1.5h-12V19H4v-2a1 1 0 0 1 1-1zM7.5 16v2m9-2v2M8 12.5h.01M16 12.5h.01",
  food: "M4 3v7a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V3M6 3v18M18 3c-1.7 1.5-2.5 3.5-2.5 6 0 1.7.8 3 2 3.7V21",
  grocery: "M4 10h16l-1.2 9.2a1.5 1.5 0 0 1-1.5 1.3H6.7a1.5 1.5 0 0 1-1.5-1.3L4 10zM3 6h18l-1 4H4L3 6zM9 6a3 3 0 0 1 6 0",
  pharmacy: "M10.5 3h3v4h4v3h-4v4h-3v-4h-4V7h4V3zM6 20h12",
  cargo: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM7 19a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zm10 0a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z",
  moped: "M5 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm14 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM8.5 12 11 7h3l2.5 5M11 7l-1.5-2M14 7V4h3",
};

export function ServiceIcon({ name, size = 26 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function AppleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 12.54c-.03-2.9 2.37-4.29 2.48-4.36-1.35-1.98-3.46-2.25-4.21-2.28-1.79-.18-3.5 1.06-4.4 1.06-.91 0-2.31-1.03-3.8-1-1.95.03-3.76 1.14-4.76 2.88-2.03 3.52-.52 8.73 1.46 11.59.97 1.4 2.12 2.97 3.63 2.91 1.46-.06 2.01-.94 3.77-.94s2.26.94 3.8.91c1.57-.03 2.56-1.42 3.52-2.83 1.11-1.62 1.57-3.19 1.6-3.27-.04-.02-3.07-1.18-3.09-4.67zM14.9 5.6c.8-.97 1.34-2.32 1.19-3.66-1.15.05-2.55.77-3.38 1.73-.74.86-1.39 2.23-1.22 3.55 1.29.1 2.6-.65 3.41-1.62z" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 2.5v19c0 .6.7 1 1.2.7l15.8-9.5c.5-.3.5-1 0-1.3L5.2 1.8c-.5-.3-1.2.1-1.2.7z" />
    </svg>
  );
}
