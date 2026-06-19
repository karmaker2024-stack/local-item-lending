import logoAsset from "@/assets/flex-my-stuff-logo.png.asset.json";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
};

/**
 * Official Flex My Stuff logo. The uploaded asset is the single source of truth
 * and must never be recreated, redrawn, recolored, or otherwise altered.
 * Only proportional resizing and padding are permitted.
 */
export function BrandLogo({ className, compact = false, inverse: _inverse = false }: BrandLogoProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Flex My Stuff"
      className={cn(
        "w-auto object-contain shrink-0",
        compact ? "h-10" : "h-14",
        className,
      )}
    />
  );
}
