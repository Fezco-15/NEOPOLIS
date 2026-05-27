import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
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


