import React from 'react';

export default function View({ eyebrow = 'FINANCIAL INTELLIGENCE', title, lede, children }) {
  return (
    <section className="content">
      <div className="view-head">
        <div className="eyebrow">{eyebrow}</div>
        <h1 className="view-title serif">{title}</h1>
        {lede && <p className="lead">{lede}</p>}
      </div>
      {children}
    </section>
  );
}
