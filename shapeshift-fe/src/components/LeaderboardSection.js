import React, { useState } from 'react';

const LeaderboardSection = ({ challengeId, challengeType }) => {
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
      const result = await response.json();
      const data = result.leaderboard || result;
      console.debug('[LeaderboardSection] challengeType:', challengeType, 'leaderboard:', data);
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
        <>
          <div style={{ background: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000 }}></div>
          <div className="fixed inset-0 flex items-center justify-center z-[1001]">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-4 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                aria-label="Close leaderboard"
              >
                &times;
              </button>
              {loading && <div>Loading...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {!loading && !error && (
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-100">
                        {challengeType === 'GroupConfig' ? (
                          <>
                            <th className="py-2 px-4 border-b text-left font-semibold">Group</th>
                            <th className="py-2 px-4 border-b text-left font-semibold">Members</th>
                            <th className="py-2 px-4 border-b text-left font-semibold">Times Completed</th>
                          </>
                        ) : (
                          <>
                            <th className="py-2 px-4 border-b text-left font-semibold">User</th>
                            <th className="py-2 px-4 border-b text-left font-semibold">Times Completed</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, idx) => (
                        challengeType === 'GroupConfig' ? (
                          <tr key={entry.group_id || idx} className={idx % 2 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-2 px-4 border-b">{entry.group_name}</td>
                            <td className="py-2 px-4 border-b">{Array.isArray(entry.members) ? entry.members.join(', ') : ''}</td>
                            <td className="py-2 px-4 border-b">{entry.times_completed ?? '-'}</td>
                          </tr>
                        ) : (
                          <tr key={entry.user_id || idx} className={idx % 2 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="py-2 px-4 border-b">{entry.user_name || (entry.user && `${entry.user.first_name} ${entry.user.last_name}`) || entry.name}</td>
                            <td className="py-2 px-4 border-b">{entry.times_completed ?? '-'}</td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeaderboardSection;
