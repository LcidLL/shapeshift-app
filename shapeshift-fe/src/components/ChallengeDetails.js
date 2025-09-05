import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import LeaderboardSection from './LeaderboardSection';
import CountdownTimer from './CountdownTimer';
import InviteButton from './InviteButton';
import ChallengeInvitations from './ChallengeInvitations';

const ChallengeDetails = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const fromMyChallenges = location.state && location.state.fromMyChallenges;
  const [participation, setParticipation] = useState(null);
  const participationId = participation?.id || null;
  const [joinMessage, setJoinMessage] = useState("");
  const handleJoin = async () => {
    if (participationId) {
      setJoinMessage('You have already joined this challenge.');
      return;
    }
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
          const part = data.find((c) => c.challenge.id === Number(id));
          if (part) setParticipation(part);
        } catch (err) {}
      };
      fetchParticipation();
    }
  }, [fromMyChallenges, id]);

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
          const part = data.find((c) => c.challenge.id === Number(id));
          if (part) setParticipation(part);
        } catch (err) {}
      };
      fetchParticipation();
    }
  }, [fromMyChallenges, id]);

  if (loading) return <div>Loading challenge details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!challenge) return <div>No challenge found.</div>;

  return (
    <div className="challenge-details-page">
      <h1>{challenge.name}</h1>
      <p>{challenge.description}</p>
      <p>Duration: {challenge.duration} {challenge.duration_type}</p>
      <p>Unit: {challenge.value} {challenge.unit}</p>
      {fromMyChallenges && participation && participation.progress < 100 && (
        <button
          style={{ marginTop: '1rem', background: 'red', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={async () => {
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
        <>
          <button
            style={{ marginTop: '1rem', background: '#28a745', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: participationId ? 'not-allowed' : 'pointer', opacity: participationId ? 0.5 : 1 }}
            onClick={handleJoin}
            disabled={!!participationId}
          >
            Join Challenge
          </button>
          {joinMessage && <div style={{ color: 'orange', marginTop: '0.5rem' }}>{joinMessage}</div>}
        </>
      )}

      {/* Progress display for joined challenges */}
      {fromMyChallenges && (
        <>
          <div style={{ marginTop: '1rem', color: '#007bff' }}>
            <strong>Progress:</strong> {participation ? `${participation.progress}%` : 'Loading...'}
          </div>
          <CountdownTimer participation={participation} challenge={challenge} />
          <InviteButton challengeId={challenge.id} />
        </>
      )}

      {/* Invitations for invited users */}
      <ChallengeInvitations challengeId={challenge.id} />

      {/* Leaderboard Button and Modal */}
      <LeaderboardSection challengeId={challenge.id} />
      {/* Add more fields as needed */}
    </div>
  );
};

export default ChallengeDetails;
