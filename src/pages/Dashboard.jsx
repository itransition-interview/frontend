import React, { useEffect, useState } from 'react';
import instance from '../api/axios';
import '../components/Dashboard/Dashboard.css';

export default function Dashboard() {
  const [news, setNews] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem('role'); // Get role from localStorage

  useEffect(() => {
    if (role === 'admin') return; // Admins don't need to fetch news

    const fetchNews = async () => {
      try {
        const res = await instance.get('/news/');
        setNews(res.data);
      } catch (err) {
        console.error('Failed to fetch news:', err.response?.data || err.message);
      }
    };

    fetchNews();
  }, [role]);

  useEffect(() => {
    if (role === 'admin') return; // Admins don't need websocket news updates

    const token = localStorage.getItem('token');
    if (!token) return;

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/news/?token=${token}`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const newItem = JSON.parse(event.data);
      setNews((prevNews) => [newItem, ...prevNews]);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error', e);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [role]);

  // Handler for admin button
  const handleGenerateNews = async () => {
    setLoading(true);
    try {
      await instance.post('http://127.0.0.1:8000/api/v1/news/generate/');
      alert('News successfully created!');
    } catch (error) {
      console.error('Error generating news:', error.response?.data || error.message);
      alert('Failed to generate news.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📰 News Dashboard</h2>

      {role === 'admin' && (
        <div className="button-container">
        <button
          onClick={handleGenerateNews}
          disabled={loading}
          style={{ /* styles here */ }}
        >
          {loading ? 'Generating...' : 'Generate News'}
        </button>
      </div>
      )}

      {role !== 'admin' && (
        <>
          {news.length === 0 ? (
            <p>No news yet.</p>
          ) : (
            <ul className="news-list">
              {news.map((item, index) => (
                <li key={index} className="news-item">
                  <div className="news-title">{item.title || item.headline}</div>
                  <div className="news-content">{item.content || item.body || ''}</div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
