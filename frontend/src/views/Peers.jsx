import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import View from '../components/View';
import Skeleton from '../components/Skeleton';

const EASE = [0.22, 1, 0.36, 1];

export default function Peers({ company }) {
  const [mode, setMode] = useState('absolute');
  const [d, setD] = useState();
  useEffect(() => {
    api.peers(company, 'operating_margin', mode).then(setD);
  }, [company, mode]);

  return (
    <View
      eyebrow="OPERATING MARGIN · PEER SET"
      title="Who operates the cleanest?"
      lede="Same industry, different operators. The spread tells you who is disciplined."
    >
      <div className="toggle">
        <button onClick={() => setMode('absolute')} className={mode === 'absolute' ? 'selected' : ''}>
          ABSOLUTE
        </button>
        <button
          onClick={() => setMode('percentile')}
          className={mode === 'percentile' ? 'selected' : ''}
        >
          PERCENTILE
        </button>
      </div>
      <motion.div
        className="panel"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {d?.data.map((x) => (
          <div className="peer" key={x.company}>
            <span>{x.name}</span>
            <strong>{mode === 'percentile' ? x.percentile + 'th' : x.value + '%'}</strong>
            <div>
              <i style={{ width: `${Math.max(5, Math.min(100, (x.value / 25) * 100))}%` }} />
            </div>
          </div>
        )) || <Skeleton />}
      </motion.div>
    </View>
  );
}
