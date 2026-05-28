"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const particles = [
  { left: "12%", top: "21%", size: 3, delay: 0.1, duration: 7 },
  { left: "29%", top: "16%", size: 2, delay: 1.2, duration: 8 },
  { left: "43%", top: "28%", size: 4, delay: 0.6, duration: 9 },
  { left: "57%", top: "18%", size: 2, delay: 1.7, duration: 7.5 },
  { left: "72%", top: "32%", size: 3, delay: 0.4, duration: 8.5 },
  { left: "86%", top: "24%", size: 2, delay: 1.1, duration: 9.2 },
  { left: "18%", top: "72%", size: 2, delay: 0.8, duration: 7.8 },
  { left: "64%", top: "70%", size: 3, delay: 1.5, duration: 8.8 }
];

export function Hero() {
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], [0, 72]);
  const contentY = useTransform(scrollY, [0, 800], [0, -28]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1B0F33]">
      <motion.div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          y: backgroundY,
          scale: 1.06,
          backgroundImage: "url('/neopolis-hero-bg.png')"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(12,8,30,0.88) 0%, rgba(20,12,45,0.72) 35%, rgba(20,12,45,0.35) 60%, rgba(20,12,45,0.15) 100%)"
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(255,107,107,.24),transparent_30%),radial-gradient(circle_at_78%_16%,rgba(167,139,250,.2),transparent_32%),linear-gradient(180deg,rgba(27,15,51,.08),rgba(27,15,51,.36))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1B0F33] via-[#1B0F33]/60 to-transparent" />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full bg-[#FFD166] shadow-[0_0_18px_rgba(255,209,102,.8)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size
          }}
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.9, 0.25], scale: [1, 1.8, 1] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        style={{ y: contentY }}
        className="container relative flex min-h-screen items-center pb-16 pt-28 sm:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="max-w-[720px]"
        >
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="inline-flex rounded-full border border-white/18 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-[#EDE7FF] shadow-[0_16px_50px_rgba(167,139,250,.16)] backdrop-blur-2xl"
          >
            AI-RPG профориентация для 8-11 классов
          </motion.div>

          <h1 className="mt-7 max-w-4xl text-balance bg-gradient-to-r from-[#FF6B6B] via-[#FF9F43] to-[#FFD166] bg-clip-text text-[clamp(3.2rem,8vw,7.8rem)] font-black leading-[0.92] tracking-normal text-transparent drop-shadow-[0_18px_48px_rgba(255,107,107,.22)]">
            НЕОПОЛИС — город, где подросток находит профессию будущего
          </h1>

          <p className="mt-7 max-w-[620px] text-lg leading-8 text-[#EDE7FF] drop-shadow-[0_2px_16px_rgba(12,8,30,.42)] sm:text-xl">
            AI-RPG платформа профориентации, где школьник проходит сюжетные миссии, исследует районы цифрового города и раскрывает свои сильные стороны.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 rounded-[24px] px-7 text-base shadow-[0_18px_52px_rgba(255,107,107,.38)] hover:shadow-[0_0_60px_rgba(255,159,67,.48)]"
            >
              <Link href="/game">
                <Play className="size-5" />
                Начать демо
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-14 rounded-[24px] border-white/18 bg-white/[0.08] px-7 text-base text-white shadow-[0_18px_52px_rgba(167,139,250,.14)] backdrop-blur-2xl hover:border-[#FF9F43]/60 hover:bg-white/[0.12]"
            >
              <Link href="#how">
                Посмотреть, как работает
                <ArrowRight className="size-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
