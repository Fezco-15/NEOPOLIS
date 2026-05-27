import { demoMissions } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function FreeDemoSection() {
  return (
    <SectionReveal>
      <div className="container grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <Badge>Первые 30% игры - бесплатно</Badge>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Попробуй первые миссии без оплаты</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            В бесплатной версии подросток проходит первые 3 района и получает предварительный профиль,
            но полный анализ, профессии, вузы, ЕГЭ и карьерная стратегия открываются после оплаты.
          </p>
        </div>
        <div className="grid gap-4">
          {demoMissions.map((mission, index) => (
            <Card key={mission} className="transition hover:border-[#FF6B6B]/40">
              <CardContent className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF6B6B]/[0.15] font-black text-[#FFF3E0]">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold text-white">{mission}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}


