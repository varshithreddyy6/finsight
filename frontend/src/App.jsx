import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, MotionConfig } from 'framer-motion';
import { api } from './lib/api';
import Landing from './landing/Landing';
import LandingFooter from './landing/LandingFooter';
import Top from './components/Top';
import Ask from './views/Ask';
import Result from './views/Result';
import Ratios from './views/Ratios';
import Peers from './views/Peers';
import Trends from './views/Trends';
import Flags from './views/Flags';
import Docs from './views/Docs';
import History from './views/History';
import Settings from './views/Settings';
import './index.css';

const NAV = ['Ask', 'Ratios', 'Peers', 'Trends', 'Flags', 'Docs', 'History', 'Settings'];
const EASE = [0.22, 1, 0.36, 1];

export default function App() {
  const [mode, setMode] = useState('landing');
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState('aurelius');
  const [view, setView] = useState('Ask');
  const [q, setQ] = useState('');
  const [result, setResult] = useState(null);
  const [theme, setTheme] = useState(localStorage.theme || 'dark');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    api.companies().then(setCompanies);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.theme = theme;
  }, [theme]);

  const ask = async (text = q) => {
    if (!text.trim()) return;
    try {
      setResult(await api.query({ question: text, company, period: 'FY2025' }));
      setView('Ask');
    } catch (e) {
      setResult({ error: e.message });
    }
  };

  const launch = (view) => {
    setView(view || 'Ask');
    setMode('app');
    window.scrollTo(0, 0);
  };

  const home = () => {
    setMode('landing');
    window.scrollTo(0, 0);
  };

  if (mode === 'landing') {
    return (
      <MotionConfig reducedMotion="user">
        <Landing onLaunch={launch} theme={theme} setTheme={setTheme} />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <Top
        nav={NAV}
        view={view}
        setView={setView}
        onHome={home}
        company={company}
        setCompany={setCompany}
        companies={companies}
        theme={theme}
        setTheme={setTheme}
      />
      <motion.main
        key={view}
        className="wrap"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {view === 'Ask' ? (
          result ? (
            <Result result={result} q={q} setQ={setQ} ask={ask} />
          ) : (
            <Ask q={q} setQ={setQ} ask={ask} setView={setView} />
          )
        ) : view === 'Ratios' ? (
          <Ratios company={company} />
        ) : view === 'Peers' ? (
          <Peers company={company} />
        ) : view === 'Trends' ? (
          <Trends company={company} />
        ) : view === 'Flags' ? (
          <Flags company={company} />
        ) : view === 'Docs' ? (
          <Docs />
        ) : view === 'History' ? (
          <History
            reopen={(x) => {
              setCompany(x.company);
              setQ(x.question);
              ask(x.question);
            }}
          />
        ) : (
          <Settings theme={theme} setTheme={setTheme} />
        )}
      </motion.main>
      <LandingFooter onLaunch={(v) => setView(v || 'Ask')} />
    </MotionConfig>
  );
}
