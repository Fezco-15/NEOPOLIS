"use client";

import { CheckCircle2, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SubscriptionState } from "@/components/game/subscription-flow";

export function SubscriptionSuccess({
  subscription,
  onContinue
}: {
  subscription: SubscriptionState;
  onContinue: () => void;
}) {
  const end = subscription.end ? new Date(subscription.end).toLocaleDateString("ru-RU") : "не указано";

  return (
    <div className="grid min-h-screen place-items-center bg-[#1B0F33] px-4 py-20 text-white">
      <div className="w-full max-w-2xl rounded-2xl border border-[#00D1C6]/30 bg-white/[0.06] p-8 text-center shadow-[0_0_70px_rgba(0,209,198,.2)] backdrop-blur-2xl">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-[#00D1C6]/15 text-[#00D1C6]">
          <CheckCircle2 className="size-12" />
        </div>
        <h1 className="mt-6 text-4xl font-black">Подписка активирована</h1>
        <p className="mt-4 text-lg leading-8 text-white/72">
          Полная версия открыта до {end}. Следующий район доступен на карте города.
        </p>
        <Button onClick={onContinue} className="mt-8 bg-gradient-to-r from-[#FF6B6B] to-[#FF9F43] text-white" size="lg">
          <Map className="size-5" />
          Вернуться на карту
        </Button>
      </div>
    </div>
  );
}
