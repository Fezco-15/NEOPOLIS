import Link from "next/link";
import { ArrowRight, Hexagon } from "lucide-react";
import { navigation } from "@/data/site";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#FF6B6B]/15 bg-[#1B0F33]/55 backdrop-blur-2xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-black text-white">
          <span className="flex size-9 items-center justify-center rounded-2xl border border-[#FF6B6B]/40 bg-[#FF6B6B]/10 shadow-[0_0_34px_rgba(255,107,107,0.28)]">
            <Hexagon className="size-5 text-[#FFD166]" />
          </span>
          <span className="text-base tracking-normal sm:text-lg">НЕОПОЛИС</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl px-3 py-2 text-sm text-white/78 transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/game">
            Начать миссию
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}


