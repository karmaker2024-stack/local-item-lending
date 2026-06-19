import colorLight from "@/assets/brand-color-light-neon.png";
import colorDark from "@/assets/brand-color-dark-neon.png";
import monoDark from "@/assets/brand-mono-dark.png";
import monoLight from "@/assets/brand-mono-light.png";
import mark from "@/assets/brand-mark.png";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  compact?: boolean;
  inverse?: boolean;
};

export function BrandLogo({ className, compact = false, inverse = false }: BrandLogoProps) {
  if (compact) {
    return <img src={mark} alt="" aria-hidden="true" className={cn("h-10 w-auto", className)} />;
  }

  if (inverse) {
    return <img src={monoDark} alt="Flex My Stuff" className={cn("h-16 w-auto", className)} />;
  }

  return (
    <span className={cn("relative block h-14 w-25 shrink-0", className)}>
      <img src={colorLight} alt="Flex My Stuff" className="h-full w-full object-contain dark:hidden" />
      <img src={colorDark} alt="Flex My Stuff" className="hidden h-full w-full object-contain dark:block" />
      <img src={monoLight} alt="" aria-hidden="true" className="hidden" />
    </span>
  );
}