import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, ease: EASE },
};

export default function CtaSection({ onLaunch }) {
  return (
    <section className="lcta">
      <motion.div {...reveal} style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px' }}>
        <h2>
          Ready to read <em>the numbers.</em>
        </h2>
        <p>Launch the app and ask your first question — it takes one sentence.</p>
        <button className="btn-pill" onClick={onLaunch}>
          Launch the app →
        </button>
      </motion.div>
    </section>
  );
}
