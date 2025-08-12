import React, { useState } from 'react';
import instance from '../api/axios';

export default function Signup() {
  const [form, setForm] = useState({ phone: '', password: '', username: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instance.post('auth/signup/', form);
    //   localStorage.setItem('token', res.data.access);
      window.location.href = '/'; // Redirect to dashboard after signup
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        placeholder="Phone"
        onChange={e => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}
