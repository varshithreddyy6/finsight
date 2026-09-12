import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const reveal = (i) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
});

const CARDS = [
  ['23.7%', 'Answers in seconds', '“What drove the margin change?” — asked in plain English, answered with the exact filing lines behind it.'],
  ['3 × 5', 'Comparisons without the spreadsheet', 'Every ratio, five years deep, across the peer set. The spread between disciplined and lazy operators is visible at a glance.'],
  ['0', 'Warnings left for the headline', 'Liquidity, controls, guidance, and outlook language are scored and ranked before the quarterly call becomes the story.'],
];

export default function Outcomes() {
  return (
    <section className="lsection lsection--black" id="outcomes">
      <div className="lcontainer">
        <motion.div className="lsec-head" {...reveal(0)}>
          <div className="eyebrow">WHAT YOU GET</div>
          <h2>
            Outcomes, <em>not outputs.</em>
          </h2>
          <p className="lead">
            Research is not about having the data. It is about knowing what changed, what it means,
            and what to watch.
          </p>
        </motion.div>
        <div className="lcards">
          {CARDS.map(([num, title, copy], i) => (
            <motion.div className="lcard" key={title} {...reveal(i)}>
              <div className="lcard-num">{num}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
