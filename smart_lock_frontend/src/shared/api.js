const API_BASE = "http://localhost:3001/api/";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    let err;
    try {
      err = await res.json();
    } catch {
      err = { detail: `Request failed with status ${res.status}` };
    }
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}
