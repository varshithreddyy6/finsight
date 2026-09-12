import React from 'react';
import { motion } from 'framer-motion';
import askView from '../assets/ask-view.png';
import measureView from '../assets/measure-view.png';
import detectView from '../assets/detect-view.png';

const EASE = [0.22, 1, 0.36, 1];
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: EASE },
};

const BLOCKS = [
  {
    tag: '01 · ASK',
    title: 'Any question, in plain English.',
    copy: 'Type the question you would ask an analyst. Finsight retrieves the exact lines from the filings and answers with citations you can click through.',
    cta: 'Try a question',
    img: askView,
    alt: 'Finsight answering a question with source citations',
    flip: false,
  },
  {
    tag: '02 · MEASURE',
    title: 'Ten ratios, five years, one view.',
    copy: 'Margins, leverage, and returns — computed from raw statement line items, never estimated, and set against the peer set in a single pane.',
    cta: 'Open the ratios',
    img: measureView,
    alt: 'Finsight ratios dashboard with five-year chart',
    flip: true,
  },
  {
    tag: '03 · DETECT',
    title: 'The flags management leaves in.',
    copy: 'The scanner reads management commentary for liquidity, controls, guidance, and outlook language — then ranks what does not add up, by severity.',
    cta: 'See the red flags',
    img: detectView,
    alt: 'Finsight red-flag report with ranked signals',
    flip: false,
  },
];

export default function ProductBlocks({ onLaunch }) {
  return (
    <section className="lsection" id="how">
      <div className="lcontainer">
        <motion.div className="lsec-head" {...reveal}>
          <div className="eyebrow">HOW IT WORKS</div>
          <h2>
            One engine, <em>three jobs.</em>
          </h2>
          <p className="lead">
            The same index powers every view — so a question, a ratio, and a red flag all come from
            the same lines of the same filings.
          </p>
        </motion.div>

        <div className="lblocks">
          {BLOCKS.map((b) => (
            <div className={b.flip ? 'lblock flip' : 'lblock'} key={b.tag}>
              <motion.div className="lblock-body" {...reveal}>
                <div className="eyebrow">{b.tag}</div>
                <h3>{b.title}</h3>
                <p>{b.copy}</p>
                <button className="lblock-link" onClick={onLaunch}>
                  {b.cta} →
                </button>
              </motion.div>
              <motion.div className="lblock-visual" {...reveal}>
                <img className="lblock-img" src={b.img} alt={b.alt} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
