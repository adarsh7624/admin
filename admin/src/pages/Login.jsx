import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setDoctorId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setDoctorId(res.data.doctorId);
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="p-10 max-w-md mx-auto mt-20 bg-white shadow rounded"
      onSubmit={handleLogin}
    >
      <h2 className="text-2xl font-bold mb-4">Doctor Login</h2>
      <input
        className="w-full border mb-4 p-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required
      />
      <input
        className="w-full border mb-4 p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;