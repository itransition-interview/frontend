import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post('auth/signin/', form);
      localStorage.setItem('token', res.data.access);

      if (res.data.role) {
        localStorage.setItem('role', res.data.role);
      } else if (res.data.user?.role) {
        localStorage.setItem('role', res.data.user.role);
      } else {
        console.warn('Role not found in login response');
        localStorage.setItem('role', 'user'); // fallback
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Phone"
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>

      {!isAuthenticated && (
        <button
          type="button"
          onClick={goToSignup}
          style={{ marginLeft: '10px' }}
        >
          Sign Up
        </button>
      )}
    </form>
  );
}
