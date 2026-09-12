import React from 'react';
import { motion } from 'framer-motion';
import Search from '../components/Search';
import Chart from '../components/Chart';
import ErrorPanel from '../components/ErrorPanel';

const EASE = [0.22, 1, 0.36, 1];
const UP = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.55, ease: EASE },
};

export default function Result({ result, q, setQ, ask }) {
  if (result.error) return <ErrorPanel text={result.error} retry={() => ask(q)} />;

  const data = result.chart?.data || [];

  return (
    <section className="content">
      <Search q={q} setQ={setQ} ask={ask} />
      <div className="eyebrow" style={{ marginTop: '40px' }}>
        ANSWER · {result.intent.toUpperCase()} <span className="period">FY2025</span>
      </div>
      <h2 className="view-title serif" style={{ margin: '16px 0 0' }}>
        The signal, clearly stated.
      </h2>

      <motion.div className="answer panel" {...UP}>
        <p>{result.answer}</p>
        {data.length > 0 && <Chart data={data} />}
      </motion.div>

      {(result.citations || []).length > 0 && (
        <>
          <div className="eyebrow section-label">SOURCE EVIDENCE</div>
          {(result.citations || []).map((c, i) => (
            <motion.article className="evidence" key={c.chunk_id || i} {...UP}>
              <b>{i + 1}. {c.section}</b>
              <small>
                {c.source_file} · score {c.score}
              </small>
              <blockquote>{c.text}</blockquote>
            </motion.article>
          ))}
        </>
      )}

      <div className="prompts" style={{ justifyContent: 'flex-start', marginTop: '40px' }}>
        {(result.follow_ups || []).map((x) => (
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
      </div>
    </section>
  );
}
