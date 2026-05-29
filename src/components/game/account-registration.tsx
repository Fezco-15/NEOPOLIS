"use client";

import { useState } from "react";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type AccountState = {
  name: string;
  email: string;
  grade: string;
};

export function AccountRegistration({ onComplete }: { onComplete: (account: AccountState) => void }) {
  const [account, setAccount] = useState<AccountState>({
    name: "",
    email: "",
    grade: "9 класс"
  });

  function completeRegistration() {
    onComplete({
      name: account.name.trim() || "Алекс",
      email: account.email.includes("@") ? account.email : "demo@neopolis.ai",
      grade: account.grade
    });
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-20">
      <Card className="w-full max-w-3xl overflow-hidden">
        <CardContent className="relative p-6 sm:p-10">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD166] to-transparent" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="lg:w-[42%]">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-[#FF6B6B]/10 text-[#FFF3E0] shadow-[0_0_34px_rgba(255,107,107,0.28)]">
                <UserRound className="size-8" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase text-[#FF6B6B]">Аккаунт кандидата</p>
              <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">Создай профиль НЕОПОЛИС</h1>
              <p className="mt-4 leading-7 text-slate-300">
                Аккаунт будет связан с аватаром, прогрессом миссий и итоговой карьерной картой.
              </p>
            </div>
            <form
              className="grid flex-1 gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                completeRegistration();
              }}
            >
              <label className="grid gap-2 text-sm font-semibold text-slate-200">
                Имя игрока
                <input
                  value={account.name}
                  onChange={(event) => setAccount((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Например, Никита"
                  className="h-12 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-[#FF6B6B]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-200">
                Email для отчета
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                  <input
                    value={account.email}
                    onChange={(event) => setAccount((current) => ({ ...current, email: event.target.value }))}
                    placeholder="player@neopolis.ai"
                    className="h-12 w-full rounded-2xl border border-white/[0.12] bg-white/[0.06] pl-11 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-[#FF6B6B]"
                  />
                </div>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-200">
                Класс
                <select
                  value={account.grade}
                  onChange={(event) => setAccount((current) => ({ ...current, grade: event.target.value }))}
                  className="h-12 rounded-2xl border border-white/[0.12] bg-[#1B0F33] px-4 text-white outline-none transition focus:border-[#FF6B6B]"
                >
                  {["8 класс", "9 класс", "10 класс", "11 класс"].map((grade) => (
                    <option key={grade}>{grade}</option>
                  ))}
                </select>
              </label>
              <Button type="submit" className="mt-2 w-full" size="lg">
                Перейти к аватару
                <ArrowRight className="size-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                onClick={() =>
                  onComplete({
                    name: "Демо-игрок",
                    email: "demo@neopolis.ai",
                    grade: "9 класс"
                  })
                }
              >
                Войти как демо-игрок
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


