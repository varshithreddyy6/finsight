import React from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-space.png';

const EASE = [0.22, 1, 0.36, 1];
const up = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay },
});

export default function Hero({ onLaunch }) {
  return (
    <section className="lhero">
      <img className="lhero-bg" src={heroBg} alt="" aria-hidden="true" />
      <div className="lhero-in">
        <motion.span className="hero-badge" {...up(0)}>
          AI FOR EQUITY RESEARCH
        </motion.span>
        <motion.h1 {...up(0.06)}>
          Financial reports, finally <span className="hl">understood.</span>
        </motion.h1>
        <motion.p className="lead" {...up(0.12)}>
          Finsight reads every filing, computes the ratios, and surfaces the signals — so you can
          ask the business its questions in plain language.
        </motion.p>
        <motion.div className="lhero-cta" {...up(0.18)}>
          <button className="btn-pill" onClick={() => onLaunch('Ask')}>
            Launch the app
          </button>
          <a href="#how" className="btn-ghost">
            See how it works ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
