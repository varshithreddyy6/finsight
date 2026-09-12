import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const QA = [
  [
    'Which companies are included?',
    'Three full research dossiers: Aurelius Systems, HarborMart Retail, and IronPeak Energy — five fiscal years of annual filings, quarterly notes, and analyst commentary each.',
  ],
  [
    'How does the answer engine work?',
    'An offline retrieval engine over 108 indexed chunks, paired with deterministic ratio math. Optional LLM providers can be plugged in with an API key, but the default engine never leaves your machine.',
  ],
  [
    'Where do the numbers come from?',
    'Straight from the financial statements in the corpus. Every ratio is computed from raw line items — nothing is estimated or pulled from a third-party feed.',
  ],
  [
    'How are red flags detected?',
    'The scanner reads management commentary for liquidity, controls, guidance, and outlook language, then ranks the signals by severity with the exact quote attached.',
  ],
  [
    'Does my data leave my machine?',
    'No. The backend, the vector index, and the database all run locally. The optional LLM providers are the only external calls, and only if you enable them.',
  ],
  [
    'Can I add my own filings?',
    'Yes. The ingest endpoint accepts new documents, chunks them, and adds them to the index — new companies included.',
  ],
];

export default function Faq({ onLaunch }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="lsection" id="faq">
      <div className="lcontainer">
        <motion.div
          className="lsec-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="eyebrow">FAQ</div>
          <h2>
            Questions, <em>answered.</em>
          </h2>
        </motion.div>
        <div className="lfaq">
          {QA.map(([q, a], i) => (
            <div className={open === i ? 'lfaq-item open' : 'lfaq-item'} key={i}>
              <button
                className="lfaq-q"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {q}
                <i>+</i>
              </button>
              {open === i && (
                <motion.p
                  className="lfaq-a"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {a}
                </motion.p>
              )}
            </div>
          ))}
        </div>
        <div className="lfaq-cta">
          <p>Still curious? The app is the best answer.</p>
          <button className="btn-pill" onClick={onLaunch}>
            Launch the app
          </button>
        </div>
      </div>
    </section>
  );
}
