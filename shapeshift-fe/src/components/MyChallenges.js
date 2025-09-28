import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("all");
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

  // Filter and deduplicate participations to latest per challenge
  const dedupedChallenges = Object.values(
    challenges.reduce((acc, p) => {
      const cid = p.challenge.id;
      if (!acc[cid] || new Date(p.joined_at) > new Date(acc[cid].joined_at)) {
        acc[cid] = p;
      }
      return acc;
    }, {})
  );

  // Filter by search term
  let filteredChallenges = dedupedChallenges.filter(
    (p) =>
      p.challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.challenge.description && p.challenge.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Filter by challengeable_type
  if (sortType === "group") {
    filteredChallenges = filteredChallenges.filter(
      p => p.challenge.challengeable_type && p.challenge.challengeable_type.toLowerCase().includes("group")
    );
  } else if (sortType === "individual") {
    filteredChallenges = filteredChallenges.filter(
      p => p.challenge.challengeable_type && p.challenge.challengeable_type.toLowerCase().includes("individual")
    );
  }

  return (
    <div className="my-challenges-page min-h-screen flex flex-col items-center py-8 px-2 md:px-0">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Challenges</h1>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search my challenges..."
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
            {filteredChallenges.map((p) => (
              <li
                key={p.id}
                className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium bg-gray-100 hover:bg-blue-50 rounded px-4 py-3 transition"
                onClick={() => navigate(`/challenges/${p.challenge.id}`, { state: { fromMyChallenges: true } })}
              >
                <span>{p.challenge.name} <span className="ml-2 text-gray-500 text-sm font-normal">Duration: {p.challenge.duration} {p.challenge.duration_type}</span></span>
                <span className="ml-4 text-gray-600 font-bold">
                  [
                  {p.challenge.challengeable_type === 'IndividualConfig' ? 'Solo' :
                   p.challenge.challengeable_type === 'GroupConfig' ? 'Group' : p.challenge.challengeable_type}
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

export default MyChallenges;
