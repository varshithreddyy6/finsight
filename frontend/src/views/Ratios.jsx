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
  transition: { duration: 0.5, ease: EASE, delay: (i % 3) * 0.06 },
});

export default function Ratios({ company }) {
  const [d, setD] = useState();
  useEffect(() => {
    api.ratios(company).then(setD);
  }, [company]);

  const entries = d ? Object.entries(d.metrics) : [];

  return (
    <View
      eyebrow="THE NUMBERS · FY2025"
      title="The business, measured."
      lede="Ten ratios, one story — how the business earns, borrows and pays."
    >
      {d ? (
        <div className="bento">
          <motion.div className="stat-card span2" {...up(0)}>
            <div className="eyebrow">OPERATING MARGIN · FY2025</div>
            <div className="num-big">{d.metrics.operating_margin}%</div>
            <div className="sub">Share of every revenue dollar kept after operating costs</div>
          </motion.div>
          {entries
            .filter(([k]) => k !== 'operating_margin')
            .map(([k, v], i) => (
              <motion.div className="stat-card" key={k} {...up(i)}>
                <div className="eyebrow">{k.replaceAll('_', ' ')}</div>
                <div className="num">{v ?? '—'}</div>
              </motion.div>
            ))}
        </div>
      ) : (
        <Skeleton />
      )}
    </View>
  );
}
