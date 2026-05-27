"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const nodes = [
  { label: "ТехноКвартал", className: "left-[16%] top-[24%]" },
  { label: "МедиаСектор", className: "right-[16%] top-[30%]" },
  { label: "Аналитический Купол", className: "left-[34%] bottom-[20%]" }
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute left-1/2 top-24 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-[#FF6B6B]/20 blur-3xl" />
      <div className="container relative grid min-h-[calc(100vh-7rem)] items-center gap-12 pb-14 lg:grid-cols-[1.02fr_0.98fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge variant="violet" className="mb-5">
            AI-RPG профориентация для 8-11 классов
          </Badge>
          <h1 className="text-balance bg-gradient-to-r from-[#FF6B6B] via-[#FF9F43] to-[#FFD166] bg-clip-text text-4xl font-black leading-[1.05] text-transparent sm:text-5xl lg:text-7xl">
            НЕОПОЛИС - город, где подросток находит профессию будущего
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
            AI-RPG платформа профориентации, где школьник проходит сюжетные миссии,
            восстанавливает город будущего, а система анализирует его мышление, мотивацию,
            интересы и карьерный потенциал.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/game">
                <Play className="size-5" />
                Начать демо
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="#how">
                Посмотреть, как работает
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.75, ease: "easeOut" }}
          className="relative mx-auto aspect-[1.05] w-full max-w-[620px]"
        >
          <div className="absolute inset-4 rounded-full bg-[#FF9F43]/18 blur-3xl" />
          <Image
            src="/neopolis-map-bg.png"
            alt="Абстрактная карта города будущего НЕОПОЛИС"
            fill
            priority
            className="rounded-2xl object-cover opacity-95"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#1B0F33]/60 via-transparent to-[#FF6B6B]/15" />
          <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FFD166]/50 bg-white/12 shadow-[0_0_34px_rgba(255,107,107,0.28)] backdrop-blur-md">
            <div className="flex h-full items-center justify-center">
              <Radar className="size-11 text-[#FFD166]" />
            </div>
          </div>
          {nodes.map((node, index) => (
            <motion.div
              key={node.label}
              className={`absolute ${node.className} hidden rounded-2xl border border-white/[0.18] bg-[#1B0F33]/65 px-3 py-2 text-xs font-semibold text-white shadow-[0_0_34px_rgba(255,107,107,0.28)] backdrop-blur md:block`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + index * 0.35, repeat: Infinity, ease: "easeInOut" }}
            >
              {node.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


