import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
};

const LIME = "#BDD328";

function Mark({ className, accentOnly = false }: { className?: string; accentOnly?: boolean }) {
  // Snowboard silhouette: black board with lime accent stripe + lime binding dots.
  const board = accentOnly ? LIME : "currentColor";
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("h-full w-auto", className)}
    >
      <g transform="rotate(-35 20 20)">
        {/* board */}
        <rect x="6" y="16" width="28" height="8" rx="4" fill={board} />
        {/* lime accent stripe */}
        <rect x="9" y="19" width="22" height="2" rx="1" fill={LIME} />
        {/* bindings */}
        <circle cx="14" cy="20" r="1.6" fill={accentOnly ? "#000" : LIME} />
        <circle cx="26" cy="20" r="1.6" fill={accentOnly ? "#000" : LIME} />
      </g>
    </svg>
  );
}

export function BrandLogo({ className, compact = false, inverse = false }: BrandLogoProps) {
  if (compact) {
    return (
      <span className={cn("inline-flex h-10 w-10 items-center justify-center text-foreground", className)}>
        <Mark />
      </span>
    );
  }

  // inverse = used on dark/primary surfaces → white text, lime accent
  const textColor = inverse ? "text-white" : "text-foreground";
  const markColor = inverse ? "text-white" : "text-foreground";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className={cn("h-9 w-9 shrink-0", markColor)}>
        <Mark />
      </span>
      <span className={cn("font-display text-lg leading-none font-bold tracking-tight", textColor)}>
        Flex
        <span style={{ color: LIME }}> My </span>
        Stuff
      </span>
    </span>
  );
}
