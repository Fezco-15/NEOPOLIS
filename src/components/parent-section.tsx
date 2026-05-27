import { parentReasons } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";
import { Card, CardContent } from "@/components/ui/card";

export function ParentSection() {
  return (
    <SectionReveal id="parents">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-[#A78BFA]">Для родителей</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Почему это покупают родители</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {parentReasons.map((item) => (
            <Card key={item.title}>
              <CardContent>
                <item.icon className="size-8 text-[#A78BFA]" />
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}


