import { steps } from "@/data/site";
import { SectionReveal } from "@/components/section-reveal";

export function HowItWorks() {
  return (
    <SectionReveal id="how">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase text-[#FF6B6B]">Механика</p>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-5xl">Как работает НЕОПОЛИС</h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-2xl border border-white/[0.12] bg-white/[0.045] p-5">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[#FF6B6B] text-lg font-black text-slate-950">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}


