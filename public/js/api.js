const API = (() => {
  const BASE = '/api';

  function getToken() { return localStorage.getItem('token'); }
  function setToken(t) { localStorage.setItem('token', t); }
  function clearToken() { localStorage.removeItem('token'); localStorage.removeItem('user'); }

  async function req(method, path, body) {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    const token = getToken();
    if (token) opts.headers['Authorization'] = 'Bearer ' + token;
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(BASE + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Greška na serveru');
    return data;
  }

  return {
    getToken, setToken, clearToken,
    getUser() { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } },
    setUser(u) { localStorage.setItem('user', JSON.stringify(u)); },

    async register(payload) {
      const data = await req('POST', '/auth/register', payload);
      setToken(data.token); this.setUser(data.user);
      return data;
    },
    async login(email, password) {
      const data = await req('POST', '/auth/login', { email, password });
      setToken(data.token); this.setUser(data.user);
      return data;
    },
    logout() { clearToken(); },

    async getProgress() { return req('GET', '/course/progress'); },
    async completeLesson(moduleId, lessonId) {
      return req('POST', '/course/lesson/complete', { moduleId, lessonId });
    },
    async submitQuiz(moduleId, answers) {
      return req('POST', '/course/quiz/submit', { moduleId, answers });
    },
    async getCertificate() { return req('GET', '/course/certificate'); },
  };
})();
