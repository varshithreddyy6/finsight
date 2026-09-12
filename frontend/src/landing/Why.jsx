import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const reveal = (i) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
});

const COLS = [
  [
    'Purpose-built for filings',
    'Not a generic chatbot pointed at documents — the engine is built around statements, notes, and commentary, with ratio math underneath.',
    (
      <svg key="i" viewBox="0 0 24 24">
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M9 12h7M9 16h7M9 8h4" />
      </svg>
    ),
  ],
  [
    'Evidence over vibes',
    'Every answer carries the exact lines it came from — section, file, and relevance score — so you verify instead of trust.',
    (
      <svg key="i" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M8 11l2 2 4-4" />
      </svg>
    ),
  ],
  [
    'One unified archive',
    'Filings, quarterly notes, analyst commentary, and your own questions — chunked, indexed, and searchable together.',
    (
      <svg key="i" viewBox="0 0 24 24">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  ],
];

export default function Why() {
  return (
    <section className="lsection lsection--black" id="why">
      <div className="lcontainer">
        <motion.div className="lsec-head" {...reveal(0)}>
          <div className="eyebrow">WHY FINSIGHT</div>
          <h2>
            Built for the way research <em>actually happens.</em>
          </h2>
          <p className="lead">
            A single indexed archive with a deterministic engine on top — fast to answer, easy to
            audit, and offline by default.
          </p>
        </motion.div>
        <div className="lwhy">
          {COLS.map(([title, copy, icon], i) => (
            <motion.div className="lwhy-col" key={title} {...reveal(i)}>
              <div className="lwhy-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
