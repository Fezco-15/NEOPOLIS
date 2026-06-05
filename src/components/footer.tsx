import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#160D2F]/95 py-10 shadow-[0_-28px_90px_rgba(12,8,30,0.42)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FF9F43]/45 to-transparent" />
      <div className="container flex flex-col justify-between gap-6 text-sm text-slate-400 md:flex-row md:items-center">
        <div>
          <p className="font-black text-white">НЕОПОЛИС</p>
          <p className="mt-1">AI-RPG платформа профориентации</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {["Документы", "Партнерам", "Школам", "Контакты"].map((item) => (
            <Link key={item} href="#" className="transition hover:text-white">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}


