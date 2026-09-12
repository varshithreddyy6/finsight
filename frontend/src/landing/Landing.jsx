import React from 'react';
import LandingHeader from './LandingHeader';
import Hero from './Hero';
import LogoMarquee from './LogoMarquee';
import ProductBlocks from './ProductBlocks';
import Outcomes from './Outcomes';
import Testimonials from './Testimonials';
import Why from './Why';
import Faq from './Faq';
import CtaSection from './CtaSection';
import LandingFooter from './LandingFooter';

export default function Landing({ onLaunch, theme, setTheme }) {
  return (
    <div className="landing">
      <LandingHeader theme={theme} setTheme={setTheme} onLaunch={onLaunch} />
      <main>
        <Hero onLaunch={onLaunch} />
        <LogoMarquee />
        <ProductBlocks onLaunch={onLaunch} />
        <Outcomes />
        <Testimonials />
        <Why />
        <Faq />
        <CtaSection onLaunch={onLaunch} />
      </main>
      <LandingFooter onLaunch={onLaunch} />
    </div>
  );
}
