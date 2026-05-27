import { solutions } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";
import { Card, CardContent } from "@/components/ui/card";

export function SolutionSection() {
  return (
    <SectionReveal>
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-[#A78BFA]">Решение</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Мы превращаем профориентацию в игру</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Игрок попадает в город будущего НЕОПОЛИС, где отключился Центральный Навигатор.
            Чтобы восстановить город, он проходит районы, решает задачи и показывает свои
            реальные склонности через действия.
          </p>
        </div>
        <div className="grid gap-4">
          {solutions.map((item) => (
            <Card key={item.title} className="overflow-hidden transition hover:border-[#A78BFA]/40 hover:shadow-[0_0_48px_rgba(167,139,250,0.28)]">
              <CardContent className="flex gap-4 p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#A78BFA]/[0.14] text-[#F3E8FF]">
                  <item.icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-300">{item.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}


