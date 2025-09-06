import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/v1/participations', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch my challenges');
        const data = await response.json();
        setChallenges(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMyChallenges();
  }, []);

  if (loading) return <div>Loading your challenges...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="my-challenges-page min-h-screen flex flex-col items-center py-8 px-2 md:px-0">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Challenges</h1>
        {challenges.length === 0 ? (
          <p className="text-center text-gray-500">You haven't joined any challenges yet.</p>
        ) : (
          <ul className="space-y-3">
            {Object.values(
              challenges.reduce((acc, p) => {
                const cid = p.challenge.id;
                if (!acc[cid] || new Date(p.joined_at) > new Date(acc[cid].joined_at)) {
                  acc[cid] = p;
                }
                return acc;
              }, {})
            ).map((p) => (
              <li
                key={p.id}
                className="cursor-pointer text-blue-600 hover:text-blue-800 underline font-medium bg-gray-100 hover:bg-blue-50 rounded px-4 py-3 transition"
                onClick={() => navigate(`/challenges/${p.challenge.id}`, { state: { fromMyChallenges: true } })}
              >
                {p.challenge.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyChallenges;
