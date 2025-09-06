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
    <div className="challenges-page min-h-screen flex flex-col items-center py-8 px-2 md:px-0">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <InvitesModal show={showInvites} onClose={() => setShowInvites(false)} />
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Challenges</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition duration-150"
            onClick={() => navigate('/challenges/new')}
          >
            Create Challenge
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition duration-150"
            onClick={() => navigate('/my-challenges')}
          >
            My Challenges
          </button>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded shadow transition duration-150"
            onClick={() => setShowInvites(true)}
          >
            Invites
          </button>
        </div>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <select
            value={sortType}
            onChange={e => setSortType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">All Types</option>
            <option value="group">Group</option>
            <option value="individual">Solo</option>
          </select>
        </div>
        {filteredChallenges.length === 0 ? (
          <p className="text-center text-gray-500">No challenges found.</p>
        ) : (
          <ul className="space-y-3">
            {filteredChallenges.map((challenge) => (
              <li
                key={challenge.id}
                className="cursor-pointer text-blue-600 hover:text-blue-800 underline font-medium bg-gray-100 hover:bg-blue-50 rounded px-4 py-3 flex items-center justify-between transition"
                onClick={() => navigate(`/challenges/${challenge.id}`)}
              >
                <span>{challenge.name}</span>
                <span className="ml-4 text-gray-600 font-bold">
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
    </div>
  );
};

export default Challenges;
