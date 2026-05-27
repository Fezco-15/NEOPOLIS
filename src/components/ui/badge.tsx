import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-[#FF6B6B]/30 bg-[#FF6B6B]/[0.12] text-[#FFD166]",
        locked: "border-[#A78BFA]/30 bg-[#A78BFA]/10 text-[#A78BFA]",
        violet: "border-[#A78BFA]/30 bg-[#A78BFA]/[0.12] text-[#F3E8FF]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };


