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
  transition: { duration: 0.5, ease: EASE, delay: (i % 2) * 0.06 },
});

export default function Docs() {
  const [d, setD] = useState();
  useEffect(() => {
    api.documents().then(setD);
  }, []);

  return (
    <View
      eyebrow="INDEXED CORPUS"
      title="The research archive."
      lede="Every filing, note and corpus file the engine reads."
    >
      {d ? (
        <div className="bento" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {d.map((x, i) => (
            <motion.div className="stat-card" key={x.filename} {...up(i)} style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="eyebrow">{x.source_type}</div>
                <div style={{ marginTop: '12px', fontFamily: 'var(--font-display)', fontSize: '22px' }}>
                  {x.filename}
                </div>
              </div>
              <span className={x.indexed ? 'badge' : 'badge badge--live'}>
                {x.indexed ? 'INDEXED' : 'PROCESSING'}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        <Skeleton />
      )}
    </View>
  );
}
