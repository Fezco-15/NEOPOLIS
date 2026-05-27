import { districts } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";
import { DistrictCard } from "@/components/district-card";

export function CityMap() {
  return (
    <SectionReveal id="districts">
      <div className="container">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-[#FF6B6B]">Город профессий</p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Районы города будущего</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            Первые три района доступны в демо. Остальные открывают полную карьерную карту и новые типы задач.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {districts.map((district) => (
            <DistrictCard key={district.name} district={district} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}


