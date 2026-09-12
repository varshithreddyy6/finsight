import React from 'react';
import { motion } from 'framer-motion';
import Search from '../components/Search';

const EASE = [0.22, 1, 0.36, 1];
const UP = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } };

const PROMPTS = [
  'Operating margin over 5 years',
  'What risks did management highlight?',
  'Compare leverage with peers',
  'Show the major red flags',
];

const STATS = [
  ['3', 'COMPANIES'],
  ['21+', 'FILINGS'],
  ['5', 'YEARS'],
  ['10', 'RATIOS'],
];

export default function Ask({ q, setQ, ask, setView }) {
  return (
    <>
      <section className="hero-band">
        <div className="wrap">
          <div className="hero">
            <motion.div className="eyebrow" {...UP}>
              EQUITY RESEARCH, ACCELERATED
            </motion.div>
            <motion.h1 className="serif" {...UP} transition={{ ...UP.transition, delay: 0.06 }}>
              Financial reports, finally <em>understood.</em>
            </motion.h1>
            <motion.p className="lead" {...UP} transition={{ ...UP.transition, delay: 0.12 }}>
              Ask questions across financial statements, management commentary, trends and risk.
            </motion.p>
            <motion.div {...UP} transition={{ ...UP.transition, delay: 0.18 }}>
              <Search q={q} setQ={setQ} ask={ask} />
            </motion.div>
            <motion.div className="hero-cta" {...UP} transition={{ ...UP.transition, delay: 0.24 }}>
              <button className="btn-ghost" onClick={() => setView('Ratios')}>
                Explore the ratios →
              </button>
            </motion.div>
            <motion.div className="prompts" {...UP} transition={{ ...UP.transition, delay: 0.3 }}>
              {PROMPTS.map((x) => (
                <button
                  key={x}
                  onClick={() => {
                    setQ(x);
                    ask(x);
                  }}
                >
                  → {x}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="statband">
        <div className="wrap">
          <div className="statband-in">
            {STATS.map(([n, label]) => (
              <div key={label}>
                <b>{n}</b>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
