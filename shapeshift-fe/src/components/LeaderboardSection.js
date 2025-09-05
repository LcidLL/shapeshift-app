import React, { useState } from 'react';

const LeaderboardSection = ({ challengeId }) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/challenges/${challengeId}/leaderboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setShow(true);
    fetchLeaderboard();
  };
  const handleClose = () => setShow(false);

  return (
    <div style={{ marginTop: '2rem' }}>
      <button onClick={handleOpen} style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Show Leaderboard
      </button>
      {show && (
        <div style={{ background: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}>
          <div style={{ background: 'white', maxWidth: 500, margin: '5rem auto', padding: '2rem', borderRadius: '8px', position: 'relative' }}>
            <button onClick={handleClose} style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            <h2>Leaderboard</h2>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!loading && !error && (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>User</th>
                    <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Times Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr key={entry.user_id} style={{ background: idx % 2 ? '#f7f7f7' : 'white' }}>
                      <td>{entry.user_name || (entry.user && `${entry.user.first_name} ${entry.user.last_name}`)}</td>
                      <td>{entry.times_completed ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardSection;
