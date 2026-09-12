import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function Chart({ data }) {
  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="amber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--accent)" stopOpacity=".28" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="period" stroke="var(--muted)" />
          <YAxis stroke="var(--muted)" />
          <Tooltip
            contentStyle={{
              background: 'var(--raised)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--accent)"
            fill="url(#amber)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="table">
        {data.map((x) => (
          <span key={x.period}>
            {x.period} <b>{x.value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
