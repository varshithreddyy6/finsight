import React from 'react';

export default function Search({ q, setQ, ask }) {
  return (
    <form
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        ask();
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask anything about the business..."
        aria-label="Ask a financial question"
      />
      <button>→</button>
    </form>
  );
}
