import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import View from '../components/View';
import Skeleton from '../components/Skeleton';

export default function History({ reopen }) {
  const [d, setD] = useState();
  useEffect(() => {
    api.history().then(setD);
  }, []);

  return (
    <View title="Recent research.">
      <div className="panel">
        {d?.map((x) => (
          <button className="history" key={x.id} onClick={() => reopen(x)}>
            <b>{x.question}</b>
            <small>
              {x.company} · {x.period} · {x.intent} · {x.timestamp}
            </small>
            <p>{x.answer_summary}</p>
          </button>
        )) || <Skeleton />}
      </div>
    </View>
  );
}
