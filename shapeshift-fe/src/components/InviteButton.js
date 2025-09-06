import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const InviteButton = ({ challengeId, onInvite }) => {
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Search users by username (first_name or last_name or both)
  const handleSearch = async (query) => {
    setUsername(query);
    if (!query) {
      setUserOptions([]);
      setUserId('');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to search users');
      // Filter by name match
      const filtered = data.filter(u =>
        u.id !== user?.id &&
        (`${u.first_name} ${u.last_name}`.toLowerCase().includes(query.toLowerCase()) ||
         u.first_name.toLowerCase().includes(query.toLowerCase()) ||
         u.last_name.toLowerCase().includes(query.toLowerCase()))
      );
      setUserOptions(filtered);
    } catch (err) {
      setUserOptions([]);
    }
  };

  const handleSelect = (u) => {
    setUserId(u.id);
    setUsername(`${u.first_name} ${u.last_name}`);
    setUserOptions([]);
  };

  const handleInvite = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/invitations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invitation: { user_id: userId, challenge_id: challengeId } })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send invitation');
      setSuccess('Invitation sent!');
      setUserId('');
      if (onInvite) onInvite();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={() => setShow(!show)} style={{ background: '#28a745', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Invite User
      </button>
      {show && (
        <div style={{ marginTop: '0.5rem' }}>
          <input
            type="text"
            placeholder="Enter user name to invite"
            value={username}
            onChange={e => handleSearch(e.target.value)}
            style={{ padding: '0.5rem', marginRight: '0.5rem' }}
          />
          {userOptions.length > 0 && (
            <ul style={{ background: 'white', border: '1px solid #ccc', maxHeight: 120, overflowY: 'auto', margin: 0, padding: 0, position: 'absolute', zIndex: 10 }}>
              {userOptions.map(u => (
                <li key={u.id} style={{ padding: '0.5rem', cursor: 'pointer' }} onClick={() => handleSelect(u)}>
                  {u.first_name} {u.last_name} ({u.email})
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleInvite} disabled={loading || !userId} style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Inviting...' : 'Send Invitation'}
          </button>
          {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginTop: '0.5rem' }}>{success}</div>}
        </div>
      )}
    </div>
  );
};

export default InviteButton;
