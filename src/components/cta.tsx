import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/section-reveal";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <SectionReveal>
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-[#FF6B6B]/25 bg-gradient-to-br from-[#FF6B6B]/25 via-[#FF9F43]/18 to-[#A78BFA]/18 px-6 py-14 text-center shadow-[0_0_34px_rgba(255,107,107,0.28)] sm:px-10">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD166] to-transparent" />
          <h2 className="mx-auto max-w-3xl text-3xl font-black text-white sm:text-5xl">
            Готов открыть свой город будущего?
          </h2>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/game">
                Начать миссию
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}


