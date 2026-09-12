import React from 'react';
import { motion } from 'framer-motion';
import malhotra from '../assets/testi-malhotra.jpg';
import okafor from '../assets/testi-okafor.jpg';
import whitfield from '../assets/testi-whitfield.jpg';
import ferreira from '../assets/testi-ferreira.jpg';
import chen from '../assets/testi-chen.jpg';
import novak from '../assets/testi-novak.jpg';

const EASE = [0.22, 1, 0.36, 1];
const reveal = (i) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: EASE, delay: (i % 3) * 0.08 },
});

const QUOTES = [
  ['The red-flag detector caught a liquidity phrase our quarterly review had glossed over.', 'R. Malhotra', 'Head of Research · Aurelius Systems', malhotra],
  ['I stopped maintaining a margin spreadsheet. The five-year view is just… there.', 'J. Okafor', 'FP&A Lead · HarborMart Retail', okafor],
  ['Five years of ratios, one line at a time. This is how I want to read every annual report.', 'S. Whitfield', 'Portfolio Manager · IronPeak Energy', whitfield],
  ['Every answer ships with its citations. I can jump to the exact line in the filing.', 'A. Ferreira', 'Analyst · Aurelius Systems', ferreira],
  ['The peer spread makes the disciplined operators and the lazy ones obvious in seconds.', 'M. Chen', 'Investment Director · HarborMart Retail', chen],
  ['It runs fully offline in a browser. For a research tool, that is not a small thing.', 'D. Novak', 'Quant Research · IronPeak Energy', novak],
];

export default function Testimonials() {
  return (
    <section className="lsection" id="voices">
      <div className="lcontainer">
        <motion.div className="lsec-head" {...reveal(0)}>
          <div className="eyebrow">FROM THE RESEARCH DESK</div>
          <h2>
            Read like an analyst <em>works.</em>
          </h2>
          <p className="lead">
            Six notes from the people who live in the filings, across the three companies in the
            archive.
          </p>
        </motion.div>
        <div className="ltestis">
          {QUOTES.map(([q, name, role, img], i) => (
            <motion.div className="ltesti" key={name} {...reveal(i)}>
              <div className="ltesti-photo">
                <img src={img} alt={name} loading="lazy" />
              </div>
              <div className="ltesti-body">
                <p className="ltesti-q">“{q}”</p>
                <div className="ltesti-who">
                  <b>{name}</b>
                  <span>{role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
