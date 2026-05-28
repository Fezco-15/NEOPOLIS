import Link from "next/link";
import { ArrowRight, Hexagon } from "lucide-react";
import { navigation } from "@/data/site";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#160D2F]/55 shadow-[0_18px_60px_rgba(12,8,30,.18)] backdrop-blur-2xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 font-black text-white">
          <span className="grid size-10 place-items-center rounded-2xl border border-[#FF9F43]/35 bg-white/[0.06] shadow-[0_0_28px_rgba(255,107,107,.22)] transition group-hover:border-[#FFD166]/60 group-hover:shadow-[0_0_40px_rgba(255,159,67,.32)]">
            <Hexagon className="size-5 text-[#FFD166]" />
          </span>
          <span className="text-lg tracking-normal sm:text-xl">НЕОПОЛИС</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-2xl px-3.5 py-2 text-sm font-semibold text-white/82 transition hover:bg-white/[0.08] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          asChild
          size="lg"
          className="hidden h-12 rounded-[24px] bg-gradient-to-r from-[#FF6B6B] via-[#FF7D55] to-[#FF9F43] px-6 text-base shadow-[0_18px_46px_rgba(255,107,107,.32)] hover:shadow-[0_0_58px_rgba(255,159,67,.48)] sm:inline-flex"
        >
          <Link href="/game">
            Начать миссию
            <ArrowRight className="size-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
