const call = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw Error(body.detail || 'Request failed');
    return body;
  } catch (e) {
    throw new Error(e.message || 'Network error');
  }
};

const get = (url) => call(url);

export const api = {
  companies: () => get('/api/companies'),
  query: (q) =>
    call('/api/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q),
    }),
  ratios: (company, period = 'FY2025') =>
    get(`/api/ratios?company=${company}&period=${period}`),
  trends: (company, metric = 'operating_margin') =>
    get(`/api/trends?company=${company}&metric=${metric}`),
  peers: (company, metric = 'operating_margin', mode = 'absolute') =>
    get(`/api/peers?company=${company}&metric=${metric}&mode=${mode}`),
  flags: (company) => get(`/api/redflags?company=${company}`),
  history: () => get('/api/history'),
  documents: () => get('/api/documents'),
  deleteHistory: (id) => call(`/api/history/${id}`, { method: 'DELETE' }),
  clearHistory: () => call('/api/history', { method: 'DELETE' }),
  deleteDocument: (filename) =>
    call(`/api/documents/${encodeURIComponent(filename)}`, { method: 'DELETE' }),
  ingest: (file) =>
    call('/api/ingest', {
      method: 'POST',
      body: (() => {
        const form = new FormData();
        form.append('file', file);
        return form;
      })(),
    }),
};
