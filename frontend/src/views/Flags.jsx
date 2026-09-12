import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import View from '../components/View';
import Skeleton from '../components/Skeleton';

const EASE = [0.22, 1, 0.36, 1];
const up = (i) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: EASE, delay: i * 0.05 },
});

export default function Flags({ company }) {
  const [d, setD] = useState();
  useEffect(() => {
    api.flags(company).then(setD);
  }, [company]);

  return (
    <View
      eyebrow="MANAGEMENT COMMENTARY · READ CAREFULLY"
      title="Read between the lines."
      lede="What management's own words are quietly admitting."
    >
      {d?.flags.length ? (
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span className="num-big" style={{ font: '88px/1 var(--font-display)', color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>
              {d.flags.length}
            </span>
            <span className="eyebrow" style={{ alignSelf: 'center' }}>
              RED FLAGS DETECTED
            </span>
          </div>
          {d.flags.map((f, i) => (
            <motion.article className="flag" key={f.category + i} {...up(i)}>
              <small>
                0{i + 1} · {f.severity}
              </small>
              <div className="fnum">0{i + 1}</div>
              <div>
                <h3>{f.category}</h3>
                <blockquote>{f.quote}</blockquote>
                <p>{f.explanation}</p>
              </div>
              <span className="fsrc">{f.source}</span>
            </motion.article>
          ))}
        </div>
      ) : (
        <Skeleton />
      )}
    </View>
  );
}
