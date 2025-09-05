import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChallengeForm from './ChallengeForm';
import InvitesModal from './InvitesModal';

const Challenges = () => {
  const [showInvites, setShowInvites] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  if (loading) return <div>Loading challenges...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter challenges by search term
  let filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (challenge.description && challenge.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter by challengeable_type
  if (sortType === "group") {
    filteredChallenges = filteredChallenges.filter(
      ch => ch.challengeable_type && ch.challengeable_type.toLowerCase().includes("group")
    );
  } else if (sortType === "individual") {
    filteredChallenges = filteredChallenges.filter(
      ch => ch.challengeable_type && ch.challengeable_type.toLowerCase().includes("individual")
    );
  }

  return (
    <div className="challenges-page">
      <InvitesModal show={showInvites} onClose={() => setShowInvites(false)} />
      <h1>Challenges</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => navigate('/challenges/new')}
        >
          Create Challenge
        </button>
        <button
          style={{ background: '#28a745', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => navigate('/my-challenges')}
        >
          My Challenges
        </button>
        <button
          style={{ background: '#6c63ff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => setShowInvites(true)}
        >
          Invites
        </button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search challenges..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: "0.5rem", flex: 1 }}
        />
        <select
          value={sortType}
          onChange={e => setSortType(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          <option value="all">All Types</option>
          <option value="group">Group</option>
          <option value="individual">Solo</option>
        </select>
      </div>
      {filteredChallenges.length === 0 ? (
        <p>No challenges found.</p>
      ) : (
        <ul>
          {filteredChallenges.map((challenge) => (
            <li
              key={challenge.id}
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', position: 'relative' }}
              onClick={() => navigate(`/challenges/${challenge.id}`)}
            >
              {challenge.name} <span style={{color: '#555', fontWeight: 'bold', marginLeft: 8}}>
                [
                {challenge.challengeable_type === 'IndividualConfig' ? 'Solo' :
                 challenge.challengeable_type === 'GroupConfig' ? 'Group' : challenge.challengeable_type}
                ]
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Challenges;
