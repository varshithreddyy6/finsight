import React from 'react';

export default function ErrorPanel({ text, retry }) {
  return (
    <div className="panel error">
      <h2 className="serif">We couldn't complete the analysis.</h2>
      <p>{text}</p>
      <button onClick={retry}>Try again →</button>
    </div>
  );
}
