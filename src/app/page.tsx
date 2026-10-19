import { Hero, Nav } from '@/components/home/hero';
import { Compare } from '@/components/home/compare';
import { Pipelines } from '@/components/home/pipelines';
import { Learning } from '@/components/home/learning';
import { Work } from '@/components/home/work';
import { Confidential } from '@/components/home/confidential';
import { About, Toolbox, Contact, Footer } from '@/components/home/rest';
import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { MotionRoot } from '@/components/home/motion-root';

export default function Home() {
  return (
    <MotionRoot>
      <div className="bg-[#05070d] text-white [cursor:auto]">
        <ScrollProgress className="top-0 z-[60] h-[2px] bg-gradient-to-r from-[#00d9ff] via-[#8b5cf6] to-[#ff79c6]" />
        <Nav />
        <main>
          <Hero />
          <Compare />
          <Pipelines />
          <Learning />
          <Work />
          <Confidential />
          <About />
          <Toolbox />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionRoot>
  );
}
