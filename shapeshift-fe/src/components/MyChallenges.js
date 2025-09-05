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
    <div className="my-challenges-page">
      <h1>My Challenges</h1>
      {challenges.length === 0 ? (
        <p>You haven't joined any challenges yet.</p>
      ) : (
        <ul>
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
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              onClick={() => navigate(`/challenges/${p.challenge.id}`, { state: { fromMyChallenges: true } })}
            >
              {p.challenge.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyChallenges;
