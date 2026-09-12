import React from 'react';

const mark = {
  width: 22,
  height: 22,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Aurelius = (
  <svg viewBox="0 0 24 24" {...mark} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 16.5l3.5-9 3.5 9M10.2 13.5h3.6" />
  </svg>
);

const HarborMart = (
  <svg viewBox="0 0 24 24" {...mark} aria-hidden="true">
    <path d="M3 10c2-2.6 4-2.6 6 0s4 2.6 6 0 4-2.6 6 0" />
    <path d="M3 15c2-2.6 4-2.6 6 0s4 2.6 6 0 4-2.6 6 0" />
  </svg>
);

const IronPeak = (
  <svg viewBox="0 0 24 24" {...mark} aria-hidden="true">
    <path d="M4 19L11 6l3.5 6.5L16.5 9 20 19z" />
  </svg>
);

const ITEMS = [
  [Aurelius, 'wm-caps', 'Aurelius Systems'],
  [HarborMart, 'wm-caps', 'HarborMart Retail'],
  [null, 'wm-num', '21+ filings'],
  [IronPeak, 'wm-caps', 'IronPeak Energy'],
  [null, 'wm-caps', '5 fiscal years'],
  [null, 'wm-num', '108 indexed chunks'],
  [null, 'wm-caps', '10 core ratios'],
  [null, 'wm-num', '3 companies'],
];

export default function LogoMarquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section className="lmarquee" aria-label="Research corpus at a glance">
      <div className="lmarquee-track">
        {row.map(([icon, cls, label], i) => (
          <div className="lmarquee-item" key={i}>
            {icon}
            <span className={cls}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
