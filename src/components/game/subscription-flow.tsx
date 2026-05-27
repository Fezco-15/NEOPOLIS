"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, QrCode, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SubscriptionPlan = "month" | "quarter" | "year";
export type PaymentMethod = "sbp" | "card";
export type SubscriptionState = {
  status: "free" | "active";
  plan: SubscriptionPlan | null;
  start: string | null;
  end: string | null;
};

const plans = [
  { id: "month", title: "1 месяц", price: "990 ₽", note: "попробовать полный отчет", days: 30 },
  { id: "quarter", title: "3 месяца", price: "2 490 ₽", note: "для прохождения миссий и симуляторов", days: 90 },
  { id: "year", title: "12 месяцев", price: "7 900 ₽", note: "выгодно для поступления и портфолио", days: 365, popular: true }
] satisfies { id: SubscriptionPlan; title: string; price: string; note: string; days: number; popular?: boolean }[];

export function buildSubscription(plan: SubscriptionPlan): SubscriptionState {
  const selected = plans.find((item) => item.id === plan) ?? plans[0];
  const start = new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + selected.days);
  return {
    status: "active",
    plan,
    start: start.toISOString(),
    end: end.toISOString()
  };
}

export function SubscriptionFlow({
  onComplete,
  onCancel
}: {
  onComplete: (subscription: SubscriptionState) => void;
  onCancel: () => void;
}) {
  const [plan, setPlan] = useState<SubscriptionPlan>("year");
  const [method, setMethod] = useState<PaymentMethod>("sbp");
  const [checkout, setCheckout] = useState(false);

  const selected = plans.find((item) => item.id === plan) ?? plans[2];

  function finish() {
    const subscription = buildSubscription(plan);
    window.localStorage.setItem("neopolis-subscription-status", subscription.status);
    window.localStorage.setItem("neopolis-subscription-plan", subscription.plan ?? "");
    window.localStorage.setItem("neopolis-subscription-start", subscription.start ?? "");
    window.localStorage.setItem("neopolis-subscription-end", subscription.end ?? "");
    onComplete(subscription);
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-[#1B0F33] px-4 py-20 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(255,107,107,.25),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(167,139,250,.25),transparent_32%)]" />
      <div className="container relative">
        <Button type="button" onClick={onCancel} variant="secondary">Вернуться</Button>
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-black uppercase text-[#FFD166]">Полная версия НЕОПОЛИС</p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">Открой полный карьерный маршрут</h1>
          <p className="mt-5 text-lg leading-8 text-white/72">
            Подписка открывает 10 районов, полный AI-отчет, ежедневные задания, древо навыков и симуляторы профессий.
          </p>
        </div>

        {!checkout ? (
          <>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {plans.map((item) => {
                const active = plan === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setPlan(item.id)}
                    whileHover={{ y: -5 }}
                    className={cn(
                      "relative rounded-2xl border bg-white/[0.06] p-6 text-left backdrop-blur-2xl transition",
                      active ? "border-[#FF6B6B] shadow-[0_0_42px_rgba(255,107,107,.28)]" : "border-white/12"
                    )}
                  >
                    {item.popular && <span className="absolute right-4 top-4 rounded-full bg-[#FFD166] px-3 py-1 text-xs font-black text-[#1B0F33]">выгодно</span>}
                    <h2 className="text-2xl font-black">{item.title}</h2>
                    <p className="mt-3 text-4xl font-black text-[#FFD166]">{item.price}</p>
                    <p className="mt-3 leading-6 text-white/65">{item.note}</p>
                    <div className="mt-5 flex items-center gap-2 font-bold text-[#00D1C6]">
                      <Check className="size-5" />
                      Полный доступ
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <Button onClick={() => setCheckout(true)} className="mt-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white" size="lg">
              Перейти к оплате
            </Button>
          </>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-2xl">
              <h2 className="text-2xl font-black">Способ оплаты</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { id: "sbp", title: "СБП", icon: QrCode },
                  { id: "card", title: "Карта", icon: CreditCard }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id as PaymentMethod)}
                    className={cn("rounded-2xl border p-4 text-left font-black transition", method === item.id ? "border-[#FF6B6B] bg-[#FF6B6B]/15" : "border-white/12 bg-white/[0.04]")}
                  >
                    <item.icon className="mb-3 size-6 text-[#FFD166]" />
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
                {method === "sbp" ? (
                  <div className="text-center">
                    <div className="mx-auto grid size-40 place-items-center rounded-2xl bg-white text-[#1B0F33]">
                      <QrCode className="size-24" />
                    </div>
                    <p className="mt-4 text-sm text-white/65">Mock QR для оплаты через СБП</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <div className="rounded-2xl bg-white/10 px-4 py-3 text-white/55">0000 0000 0000 0000</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-white/10 px-4 py-3 text-white/55">MM / YY</div>
                      <div className="rounded-2xl bg-white/10 px-4 py-3 text-white/55">CVV</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-[#FFD166]/25 bg-[#FFD166]/10 p-6 backdrop-blur-2xl">
              <Sparkles className="size-9 text-[#FFD166]" />
              <h2 className="mt-4 text-3xl font-black">{selected.title}</h2>
              <p className="mt-2 text-5xl font-black">{selected.price}</p>
              <div className="mt-6 grid gap-3 text-white/76">
                {["10 профориентационных районов", "Полный AI-отчет", "PM + Data симуляторы сразу", "Daily quests и древо навыков"].map((item) => (
                  <div key={item} className="flex gap-2"><ShieldCheck className="size-5 shrink-0 text-[#00D1C6]" />{item}</div>
                ))}
              </div>
              <Button onClick={finish} className="mt-8 w-full bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white" size="lg">
                Оплатить mock
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
