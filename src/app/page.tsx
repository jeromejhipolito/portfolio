import { Libre_Franklin, Source_Serif_4 } from 'next/font/google';
import { Hero } from '@/components/home/hero';
import { Stats, About, Work, Toolbox } from '@/components/home/sections';
import { How } from '@/components/home/how';
import { Contact, Footer } from '@/components/home/contact';
import { Reveal } from '@/components/home/reveal';
import '@/components/home/home.css';

const display = Libre_Franklin({ subsets: ['latin'], weight: '700', variable: '--font-display', display: 'swap' });
const text = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-text',
  display: 'swap',
});

export default function Home() {
  return (
    <div className={`home ${display.variable} ${text.variable}`}>
      {/* Hidden animation states apply only once this runs, so the page reads fine without JS. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <Hero />
      <main>
        <Stats />
        <How />
        <About />
        <Work />
        <Toolbox />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </div>
  );
}
