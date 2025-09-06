import React, { useState } from 'react';

const ChallengeForm = ({ onSuccess, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    duration: '',
    duration_type: '',
    value: '',
    unit: '',
    challengeable_type: 'IndividualConfig',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/challenges', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to create challenge');
      setForm({
        name: '', description: '', duration: '', duration_type: '', value: '', unit: '', challengeable_type: 'IndividualConfig'
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl mb-8 shadow max-w-xl mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Create Challenge</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
      <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
      <select name="duration_type" value={form.duration_type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
        <option value="">Select duration type...</option>
        <option value="seconds">Seconds</option>
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
      <input name="value" value={form.value} onChange={handleChange} placeholder="Value" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
      <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" required className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
      <select name="challengeable_type" value={form.challengeable_type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200">
        <option value="IndividualConfig">Solo</option>
        <option value="GroupConfig">Group</option>
      </select>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex gap-4 justify-center">
        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow disabled:opacity-50">
          {loading ? 'Creating...' : 'Create'}
        </button>
        <button type="button" onClick={onCancel} disabled={loading} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded shadow disabled:opacity-50">Cancel</button>
      </div>
    </form>
  );
};

export default ChallengeForm;
