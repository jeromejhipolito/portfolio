import { Hero, Nav } from '@/components/home/hero';
import { Pipelines } from '@/components/home/pipelines';
import { Work } from '@/components/home/work';
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
          <Pipelines />
          <Work />
          <About />
          <Toolbox />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionRoot>
  );
}
