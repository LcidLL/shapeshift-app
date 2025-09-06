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
  const [joinLoading, setJoinLoading] = useState(false);
  const handleJoin = async () => {
    if (joinLoading) return; // Prevent double submit
    setJoinLoading(true);
    console.debug('[handleJoin] Called. participationId:', participationId, 'challenge:', challenge);
    if (participationId) {
      // Allow re-join for IndividualConfig only if previous is complete
      if (challenge?.challengeable_type === 'IndividualConfig' && participation?.progress === 100) {
        try {
          const token = localStorage.getItem('token');
          console.debug('[handleJoin] Joining challenge:', challenge?.id);
          const response = await fetch('/api/v1/participations', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ participation: { challenge_id: challenge.id } })
          });
          if (!response.ok) {
            if (response.status === 422) {
              setJoinMessage('You must complete or forfeit your current participation before joining again.');
            } else {
              setJoinMessage('Failed to join challenge. Please try again.');
            }
            setJoinLoading(false);
            return;
          }
          console.debug('[handleJoin] Join successful. Fetching participation...');
          await fetchParticipation(); // Refresh participation state after join
          console.debug('[handleJoin] Participation refreshed. Navigating to /my-challenges');
          navigate('/my-challenges');
        } catch (err) {
          setError(err.message);
          setJoinLoading(false);
          console.error('[handleJoin] Join error:', err);
        }
      } else if (window.confirm('You have already joined this challenge. Do you want to forfeit and restart?')) {
        try {
          const token = localStorage.getItem('token');
          console.debug('[handleJoin] Forfeiting participation:', participationId);
          const response = await fetch(`/api/v1/participations/${participationId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) throw new Error('Failed to forfeit challenge');
          setParticipation(null); // Clear local state
          console.debug('[handleJoin] Forfeit successful.');
        } catch (err) {
          setError(err.message);
          console.error('[handleJoin] Forfeit error:', err);
          return;
        }
      } else {
        setJoinMessage('You have already joined this challenge.');
        console.debug('[handleJoin] User cancelled forfeit.');
        return;
      }
    }
    try {
      const token = localStorage.getItem('token');
      setJoinMessage('[DEBUG] Joining challenge: ' + (challenge?.id ?? 'unknown'));
      console.debug('[handleJoin] Joining challenge:', challenge?.id);
      const response = await fetch('/api/v1/participations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ participation: { challenge_id: challenge.id } })
      });
      if (!response.ok) {
        if (response.status === 422) {
          setJoinMessage('You must complete or forfeit your current participation before joining again.');
        } else {
          setJoinMessage('Failed to join challenge. Please try again.');
        }
        setJoinLoading(false);
        return;
      }
      console.debug('[handleJoin] Join successful. Fetching participation...');
      await fetchParticipation(); // Refresh participation state after join
      console.debug('[handleJoin] Participation refreshed. Navigating to /my-challenges');
      navigate('/my-challenges');
    } catch (err) {
      setError(err.message);
      setJoinLoading(false);
      console.error('[handleJoin] Join error:', err);
    }
    setJoinLoading(false);
  };


  // Make fetchParticipation available for handleJoin and effects
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
    <div className="challenge-details-page min-h-screen flex flex-col items-center py-8 px-2 md:px-0">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">{challenge.name}</h1>
        <p className="mb-2 text-gray-700 text-lg text-center">{challenge.description}</p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
          <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-semibold">Duration: {challenge.duration} {challenge.duration_type}</span>
          <span className="bg-green-100 text-green-800 rounded-full px-4 py-1 text-sm font-semibold">Unit: {challenge.value} {challenge.unit}</span>
        </div>
      {fromMyChallenges && participation && participation.progress < 100 && (
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-150"
          onClick={async () => {
            console.debug('[forfeit] Clicked. participationId:', participationId);
            if (!window.confirm('Are you sure you want to forfeit this challenge?')) {
              console.debug('[forfeit] User cancelled forfeit.');
              return;
            }
            try {
              const token = localStorage.getItem('token');
              console.debug('[forfeit] Sending DELETE to /api/v1/participations/' + participationId);
              const response = await fetch(`/api/v1/participations/${participationId}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) throw new Error('Failed to forfeit challenge');
              console.debug('[forfeit] Forfeit successful. Reloading My Challenges.');
              window.location.assign('/my-challenges');
            } catch (err) {
              setError(err.message);
              console.error('[forfeit] Error:', err);
            }
          }}
        >
          Forfeit Challenge
        </button>
      )}
      {!fromMyChallenges && (
        <>
          <button
            className={`mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition duration-150 ${joinLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleJoin}
            disabled={joinLoading}
          >
            {joinLoading ? 'Joining...' : 'Join Challenge'}
          </button>
          {joinMessage && <div className="text-orange-500 mt-2 text-center">{joinMessage}</div>}
        </>
      )}

      {/* Progress display for joined challenges */}
      {fromMyChallenges && participation && typeof participation.progress === 'number' && participation.joined_at ? (
        <>
          <div className="mt-4 text-blue-600 text-lg font-semibold text-center">
            <strong>Progress:</strong> {`${participation.progress}%`}
          </div>
          <CountdownTimer participation={participation} challenge={challenge} />
          <InviteButton challengeId={challenge.id} />
        </>
      ) : fromMyChallenges && (
        <div className="mt-4 text-gray-500 text-center">
          You have not joined this challenge yet.
        </div>
      )}

      {/* Invitations for invited users */}
      <ChallengeInvitations challengeId={challenge.id} />

      {/* Leaderboard Button and Modal */}
      <LeaderboardSection challengeId={challenge.id} challengeType={challenge.challengeable_type} />
      {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default ChallengeDetails;
