import type React from "react";
import { Lock } from "lucide-react";
import { districts } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type District = (typeof districts)[number];

export function DistrictCard({
  district,
  onClick,
  interactive = false
}: {
  district: District;
  onClick?: () => void;
  interactive?: boolean;
}) {
  const Icon = district.icon;
  const isOpen = district.demo;
  const canOpen = interactive && isOpen && Boolean(onClick);
  const interactiveProps = canOpen
    ? {
        role: "button",
        tabIndex: 0,
        onClick,
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => {
          if (event.key === "Enter" || event.key === " ") onClick?.();
        }
      }
    : {};

  return (
    <Card
      {...interactiveProps}
      className={cn(
        "group min-h-[176px] transition duration-300 hover:-translate-y-1 hover:border-[#FF6B6B]/[0.45] hover:shadow-[0_0_34px_rgba(255,107,107,0.28)]",
        canOpen && "cursor-pointer",
        !isOpen && "opacity-70"
      )}
    >
      <CardContent className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-white/[0.08] text-[#FFF3E0]">
            <Icon className="size-6" />
          </div>
          {!isOpen && <Lock className="size-5 text-slate-500" />}
        </div>
        <div>
          <h3 className="mt-7 text-lg font-bold text-white">{district.name}</h3>
          <Badge variant={isOpen ? "default" : "locked"} className="mt-3">
            {district.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}


