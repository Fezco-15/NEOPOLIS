import { problems } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";
import { Card, CardContent } from "@/components/ui/card";

export function ProblemSection() {
  return (
    <SectionReveal id="product" className="neopolis-depth-problem">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.45fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-[#FF6B6B]">Проблема</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Обычные тесты больше не работают</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Профориентация не должна быть анкетой с одинаковыми ответами. Подросток раскрывается в действии: когда выбирает, рискует, спорит, помогает и принимает решения под давлением.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {problems.map((item) => (
            <Card key={item.title} className="neopolis-holo-card group transition hover:-translate-y-1 hover:border-[#FF6B6B]/40 hover:shadow-[0_0_34px_rgba(255,107,107,0.28)]">
              <CardContent>
                <item.icon className="size-8 text-[#FF6B6B] transition group-hover:scale-110" />
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}


