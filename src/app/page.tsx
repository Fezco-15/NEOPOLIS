import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProblemSection } from "@/components/problem-section";
import { SolutionSection } from "@/components/solution-section";
import { HowItWorks } from "@/components/how-it-works";
import { CityMap } from "@/components/city-map";
import { FreeDemoSection } from "@/components/free-demo-section";
import { ParentSection } from "@/components/parent-section";
import { FuturePassport } from "@/components/future-passport";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <CityMap />
        <FreeDemoSection />
        <ParentSection />
        <FuturePassport />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

