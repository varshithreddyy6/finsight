import React from 'react';

export default function LandingFooter({ onLaunch }) {
  return (
    <footer className="lfooter">
      <div className="lcontainer">
        <div className="lfoot-grid">
          <div className="lfoot-brand">
            <button className="flogo" onClick={onLaunch}>
              finsight
            </button>
            <p>Financial reports, finally understood. Equity research, accelerated.</p>
          </div>
          <div className="lfoot">
            <h4>Product</h4>
            <div className="lfoot-col">
              <button onClick={onLaunch}>Ask</button>
              <button onClick={onLaunch}>Ratios</button>
              <button onClick={onLaunch}>Peers</button>
              <button onClick={onLaunch}>Trends</button>
              <button onClick={onLaunch}>Red flags</button>
            </div>
          </div>
          <div className="lfoot">
            <h4>Companies</h4>
            <div className="lfoot-col">
              <span>Aurelius Systems</span>
              <span>HarborMart Retail</span>
              <span>IronPeak Energy</span>
            </div>
          </div>
          <div className="lfoot">
            <h4>Platform</h4>
            <div className="lfoot-col">
              <span>Offline engine</span>
              <span>Ratio math</span>
              <span>Flag scanner</span>
              <span>Ingest</span>
            </div>
          </div>
          <div className="lfoot">
            <h4>Resources</h4>
            <div className="lfoot-col">
              <a href="https://github.com/varshithreddyy6/finsight">GitHub</a>
              <a href="mailto:varshithreddyy6@gmail.com">Email</a>
              <a href="https://linkedin.com/in/varshithreddyvangeti">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="lfoot-bottom">
          <span>© 2026 Finsight · Designed & built by Varshith Reddy</span>
          <div className="lfoot-legal">
            <span>Built in Patancheru, Telangana</span>
            <span>React · FastAPI · SQLite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
