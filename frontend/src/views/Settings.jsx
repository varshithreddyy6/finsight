import React from 'react';
import View from '../components/View';

export default function Settings({ theme, setTheme }) {
  return (
    <View title="Settings.">
      <div className="panel">
        <div className="row">
          <span>DISPLAY</span>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme.toUpperCase()} · toggle
          </button>
        </div>
        <div className="row">
          <span>ANSWER ENGINE</span>
          <b>OFFLINE</b>
        </div>
        <div className="row">
          <span>MOTION</span>
          <b>STANDARD</b>
        </div>
      </div>
    </View>
  );
}
