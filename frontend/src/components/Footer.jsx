import React from 'react';

const PRODUCT = ['Ask', 'Ratios', 'Peers', 'Trends', 'Flags', 'Docs', 'History', 'Settings'];

export default function Footer({ setView }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <button className="flogo" onClick={() => setView('Ask')}>
              finsight
            </button>
            <p>Financial reports, finally understood. Equity research, accelerated.</p>
          </div>
          <div>
            <h4>Product</h4>
            <div className="footer-col">
              {PRODUCT.map((n) => (
                <button key={n} onClick={() => setView(n)}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4>Connect</h4>
            <div className="footer-col">
              <a href="mailto:varshithreddyy6@gmail.com">Email</a>
              <a href="https://linkedin.com/in/varshithreddyvangeti">LinkedIn</a>
              <a href="https://github.com/varshreddyy6">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Finsight · Designed & built by Varshith Reddy</span>
          <div className="flinks">
            <span>React</span>
            <span>FastAPI</span>
            <span>SQLite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
