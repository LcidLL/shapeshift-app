import React, { useEffect, useState } from 'react';

const ChallengeInvitations = ({ challengeId }) => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/v1/invitations`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch invitations');
        // Fetch details for each invitation using the show method
        const details = await Promise.all(
          data.map(async (inv) => {
            const res = await fetch(`/api/v1/invitations/${inv.id}`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            return res.ok ? res.json() : inv;
          })
        );
        // Get user id from /api/v1/profile
        let userId;
        try {
          const profileRes = await fetch('/api/v1/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          console.log('Profile fetch status:', profileRes.status);
          if (profileRes.ok) {
            const profile = await profileRes.json();
            console.log('Profile response:', profile);
            userId = profile.data && profile.data.user && profile.data.user.id;
            console.log('Extracted userId:', userId);
          } else {
            const errText = await profileRes.text();
            console.log('Profile fetch error:', errText);
          }
        } catch (e) { 
          userId = undefined;
          console.log('Profile fetch exception:', e);
        }
        console.log('Current userId:', userId);
        console.log('Fetched invitations (details):', details);
        details.forEach(inv => console.log('Invitation:', inv));
        const filteredInvs = details.filter(inv => (inv.status === 'pending' || inv.status === null) && inv.user_id === userId);
        console.log('Filtered invitations for user', userId, ':', filteredInvs);
        setInvitations(filteredInvs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, [challengeId]);

  const handleAction = async (invitationId, action) => {
    setActionLoading(invitationId + '-' + action);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/v1/invitations/${invitationId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to ' + action + ' invitation');
      setInvitations(invitations.filter(inv => inv.id !== invitationId));
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return <div>Loading invitations...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!invitations.length) return null;

  return (
    <div style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
      <h3>Challenge Invitations</h3>
      <ul>
        {invitations.map(inv => (
          <li key={inv.id} style={{ marginBottom: '1rem' }}>
            <div><b>Workout:</b> {inv.challenge?.name || 'N/A'}</div>
            <div><b>Description:</b> {inv.challenge?.description || 'N/A'}</div>
            <button
              onClick={() => handleAction(inv.id, 'accept')}
              disabled={actionLoading === inv.id + '-accept'}
              style={{ marginRight: 8, background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 1rem', cursor: 'pointer' }}
            >
              {actionLoading === inv.id + '-accept' ? 'Accepting...' : 'Accept'}
            </button>
            <button
              onClick={() => handleAction(inv.id, 'reject')}
              disabled={actionLoading === inv.id + '-reject'}
              style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '0.3rem 1rem', cursor: 'pointer' }}
            >
              {actionLoading === inv.id + '-reject' ? 'Rejecting...' : 'Reject'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeInvitations;
