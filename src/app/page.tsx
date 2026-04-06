import { Nav } from '@/components/layout/nav';
import { Hero } from '@/components/sections/hero';
import { ProofBar } from '@/components/sections/proof-bar';
import { Footer } from '@/components/layout/footer';
import { Suspense } from 'react';
import { Projects } from '@/components/sections/projects';
import { Workflow } from '@/components/sections/workflow';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';
import { VideoIntro } from '@/components/sections/video-intro';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <VideoIntro />
      <ProofBar />

      <Experience />

      <Suspense fallback={null}>
        <Projects />
      </Suspense>

      <Workflow />

      <Contact />

      <Footer />
    </>
  );
}
