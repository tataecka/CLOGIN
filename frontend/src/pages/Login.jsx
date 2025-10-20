import { useState, useEffect } from 'react';
import api from '../lib/api'; 

export default function Login({ onLogin, api }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [companies, setCompanies] = useState([]); 
  const [error, setError] = useState(''); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await api.get('/companies');
        setCompanies(res.data);
      } catch (err) {
        console.error('Failed to load companies', err);
        setError('Could not load companies');
      }
    };
    fetchCompanies();
  }, [api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/login', {
        username: username.trim(),
        password: password,
        company_code: companyCode,
      });
      onLogin(response.data.token, response.data.company);
    } catch (err) {
      console.error('Login error:', err);
      if (err.response?.status === 401) {
        setError('Invalid username, password, or company');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <input
          type="text"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <select
          className="border p-2 w-full mb-4 rounded"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
          disabled={loading}
          required
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.code} value={company.code}>
              {company.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading || !username || !password || !companyCode}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}