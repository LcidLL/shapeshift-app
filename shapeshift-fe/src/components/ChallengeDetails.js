import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/v1/challenges/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch challenge details');
        const data = await response.json();
        setChallenge(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this challenge?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/challenges/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to delete challenge');
      navigate('/challenges');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading challenge details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!challenge) return <div>No challenge found.</div>;

  const location = useLocation();
  const fromMyChallenges = location.state && location.state.fromMyChallenges;
  const [participationId, setParticipationId] = useState(null);

  useEffect(() => {
    if (fromMyChallenges) {
      const fetchParticipation = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('/api/v1/participations', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) return;
          const data = await response.json();
          // Find the participation with this challenge id
          const part = data.find((c) => c.id === Number(id));
          if (part && part.participation_id) setParticipationId(part.participation_id);
        } catch (err) {}
      };
      fetchParticipation();
    }
  }, [fromMyChallenges, id]);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/participations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participation: { challenge_id: challenge.id } })
      });
      if (!response.ok) throw new Error('Failed to join challenge');
      navigate('/my-challenges');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="challenge-details-page">
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <p>Duration: {challenge.duration} {challenge.duration_type}</p>
      <p>Unit: {challenge.value} {challenge.unit}</p>
      {fromMyChallenges && (
        <button
          style={{ marginTop: '1rem', background: 'red', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={async () => {
            if (!participationId) return;
            if (!window.confirm('Are you sure you want to forfeit this challenge?')) return;
            try {
              const token = localStorage.getItem('token');
              const response = await fetch(`/api/v1/participations/${participationId}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) throw new Error('Failed to forfeit challenge');
              navigate('/my-challenges');
            } catch (err) {
              setError(err.message);
            }
          }}
        >
          Forfeit Challenge
        </button>
      )}
      {!fromMyChallenges && (
        <button
          style={{ marginTop: '1rem', background: '#28a745', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={handleJoin}
        >
          Join Challenge
        </button>
      )}
      {/* Add more fields as needed */}
    </div>
  );
};

export default ChallengeDetails;
