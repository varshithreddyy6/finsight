import React from 'react';

export default function Top({
  nav,
  view,
  setView,
  onHome,
  company,
  setCompany,
  companies,
  theme,
  setTheme,
}) {
  return (
    <header className="top wrap">
      <button className="logo serif" onClick={onHome}>
        finsight
      </button>
      <nav>
        {nav.map((n) => (
          <button key={n} className={view === n ? 'active' : ''} onClick={() => setView(n)}>
            <i /> {n}
          </button>
        ))}
      </nav>
      <div className="controls">
        <select
          aria-label="Select company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          className="theme"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '☼' : '☾'}
        </button>
      </div>
    </header>
  );
}
