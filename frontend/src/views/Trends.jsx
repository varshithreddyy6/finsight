import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import View from '../components/View';
import Chart from '../components/Chart';
import Skeleton from '../components/Skeleton';

const EASE = [0.22, 1, 0.36, 1];
const up = (i) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: EASE, delay: i * 0.06 },
});

const METRICS = [
  'revenue',
  'revenue_growth',
  'gross_margin',
  'operating_margin',
  'net_margin',
  'roe',
  'roa',
  'free_cash_flow',
  'eps',
  'debt_to_equity',
];

export default function Trends({ company }) {
  const [metric, setMetric] = useState('operating_margin');
  const [d, setD] = useState();
  useEffect(() => {
    api.trends(company, metric).then(setD);
  }, [company, metric]);

  const data = d?.data || [];
  const nums = data.filter((x) => x.value != null);
  const latest = nums[nums.length - 1];
  const high = nums.reduce((a, b) => (b.value > a.value ? b : a), nums[0]);
  const low = nums.reduce((a, b) => (b.value < a.value ? b : a), nums[0]);

  return (
    <View
      eyebrow="FIVE YEARS OF DATA"
      title={metric.replaceAll('_', ' ')}
      lede="One line at a time. Pick a metric and read the trajectory."
    >
      <div className="selector">
        {METRICS.map((x) => (
          <button
            key={x}
            className={metric === x ? 'selected' : ''}
            onClick={() => setMetric(x)}
          >
            {x.replaceAll('_', ' ')}
          </button>
        ))}
      </div>
      {d ? (
        <>
          <div className="bento">
            {['LATEST', 'HIGHEST', 'LOWEST'].map((label, i) => {
              const s = [latest, high, low][i];
              return (
                <motion.div className="stat-card" key={label} {...up(i)}>
                  <div className="eyebrow">{label} · {s?.period || '—'}</div>
                  <div className="num">{s?.value ?? '—'}</div>
                </motion.div>
              );
            })}
          </div>
          <motion.div className="panel" {...up(3)}>
            <Chart data={data} />
          </motion.div>
        </>
      ) : (
        <Skeleton />
      )}
    </View>
  );
}
