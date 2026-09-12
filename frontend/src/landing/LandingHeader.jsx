import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Spark = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
    <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
  </svg>
);

const Caret = ({ open }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const GITHUB = 'https://github.com/varshithreddyy6/finsight';

const MENUS = {
  Product: {
    cols: 3,
    cards: [
      { t: 'Ask', d: 'Research in plain language, with citations', view: 'Ask' },
      { t: 'Ratios', d: 'Ten ratios, five years deep', view: 'Ratios' },
      { t: 'Peers', d: 'Who operates the cleanest', view: 'Peers' },
      { t: 'Trends', d: 'Five-year trajectories, one line at a time', view: 'Trends' },
      { t: 'Red flags', d: "What management's words admit", view: 'Flags' },
      { t: 'Docs', d: 'The indexed research archive', view: 'Docs' },
    ],
  },
  Solutions: {
    cols: 3,
    cards: [
      { t: 'Aurelius Systems', d: 'Fintech · FY2021–FY2025', view: 'Ask' },
      { t: 'HarborMart Retail', d: 'Retail · FY2021–FY2025', view: 'Ask' },
      { t: 'IronPeak Energy', d: 'Energy · FY2021–FY2025', view: 'Ask' },
    ],
  },
  Platform: {
    cols: 2,
    cards: [
      { t: 'Offline engine', d: 'Deterministic answers, no cloud calls', view: 'Settings' },
      { t: 'Ratio math', d: 'Computed from raw line items', view: 'Ratios' },
      { t: 'Flag scanner', d: 'Risk language, ranked by severity', view: 'Flags' },
      { t: 'Ingest', d: 'Add your own filings to the index', view: 'Docs' },
    ],
  },
  Customers: {
    cols: 1,
    cards: [{ t: 'Open the app', d: 'Three full research dossiers, ready now', view: 'Ask' }],
  },
  Resources: {
    cols: 3,
    cards: [
      { t: 'Docs', d: 'The research archive', view: 'Docs' },
      { t: 'GitHub', d: 'Source, data and README', href: GITHUB },
      { t: 'Email', d: 'Reach the builder', href: 'mailto:varshithreddyy6@gmail.com' },
    ],
  },
  Company: {
    cols: 2,
    cards: [
      { t: 'About', d: 'Built in Patancheru, Telangana', href: GITHUB },
      { t: 'Contact', d: 'varshithreddyy6@gmail.com', href: 'mailto:varshithreddyy6@gmail.com' },
    ],
  },
};

const NAV = ['Product', 'Solutions', 'Platform', 'Customers', 'Resources', 'Company'];

export default function LandingHeader({ theme, setTheme, onLaunch }) {
  const [open, setOpen] = useState(null);

  return (
    <header className="lh" onMouseLeave={() => setOpen(null)}>
      <div className="lh-in">
        <button className="lh-logo" onClick={() => onLaunch('Ask')}>
          {Spark} Finsight
        </button>
        <nav>
          {NAV.map((label) => (
            <button
              key={label}
              className={open === label ? 'lh-nav open' : 'lh-nav'}
              onMouseEnter={() => setOpen(label)}
              onClick={() => {
                if (label === 'Customers') {
                  setOpen(null);
                  onLaunch('Ask');
                } else {
                  setOpen(open === label ? null : label);
                }
              }}
            >
              {label} {MENUS[label] && MENUS[label].cols > 1 ? <Caret open={open === label} /> : null}
            </button>
          ))}
        </nav>
        <div className="lh-right">
          <button
            className="theme"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '☼' : '☾'}
          </button>
          <button className="lh-cta" onClick={() => onLaunch('Ask')}>
            Launch the app
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && MENUS[open] && (
          <motion.div
            key={open}
            className="lmenu"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onMouseEnter={() => setOpen(open)}
            onMouseLeave={() => setOpen(null)}
          >
            <div className="lmenu-grid" style={{ gridTemplateColumns: `repeat(${MENUS[open].cols}, 1fr)` }}>
              {MENUS[open].cards.map((c) => (
                <button
                  key={c.t}
                  className="lm-card"
                  onClick={() => {
                    setOpen(null);
                    if (c.href) window.open(c.href, '_blank');
                    else onLaunch(c.view || 'Ask');
                  }}
                >
                  <span className="lm-t">
                    {c.t} <Arrow />
                  </span>
                  <span className="lm-d">{c.d}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
