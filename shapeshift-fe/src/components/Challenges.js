import React, { useEffect, useState } from 'react';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/v1/challenges', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch challenges');
        const data = await response.json();
        setChallenges(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  if (loading) return <div>Loading challenges...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="challenges-page">
      <h1>Challenges</h1>
      {challenges.length === 0 ? (
        <p>No challenges found.</p>
      ) : (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge.id}>{challenge.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Challenges;
