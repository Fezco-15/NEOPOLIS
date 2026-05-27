"use client";

import Link from "next/link";
import { ArrowLeft, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function GameIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center px-4 py-20">
      <Card className="w-full max-w-3xl overflow-hidden">
        <CardContent className="relative p-8 text-center sm:p-12">
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#FFD166] to-transparent" />
          <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-[#FF6B6B]/[0.35] bg-[#FF6B6B]/10 shadow-[0_0_34px_rgba(255,107,107,0.28)]">
            <Power className="size-10 text-[#FFF3E0]" />
          </div>
          <p className="mt-8 text-sm font-semibold uppercase text-[#FF6B6B]">Протокол запуска</p>
          <h1 className="mt-4 text-3xl font-black leading-tight text-white sm:text-5xl">
            Центральный Навигатор отключен.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Городу нужны новые специалисты. Ты выбран как кандидат программы
            «Архитектор будущего».
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button onClick={onStart} size="lg">
              Активировать профиль
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">
                <ArrowLeft className="size-5" />
                На главную
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


