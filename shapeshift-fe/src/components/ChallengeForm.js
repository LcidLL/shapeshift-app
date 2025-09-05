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
    <form onSubmit={handleSubmit} style={{ background: '#f8f8f8', padding: 20, borderRadius: 8, marginBottom: 20 }}>
      <h2>Create Challenge</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ width: '100%', marginBottom: 8 }} />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={{ width: '100%', marginBottom: 8 }} />
      <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" required style={{ width: '100%', marginBottom: 8 }} />
      <select name="duration_type" value={form.duration_type} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }}>
        <option value="">Select duration type...</option>
        <option value="seconds">Seconds</option>
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
      <input name="value" value={form.value} onChange={handleChange} placeholder="Value" required style={{ width: '100%', marginBottom: 8 }} />
      <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit" required style={{ width: '100%', marginBottom: 8 }} />
      <select name="challengeable_type" value={form.challengeable_type} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }}>
        <option value="IndividualConfig">Solo</option>
        <option value="GroupConfig">Group</option>
      </select>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button type="submit" disabled={loading} style={{ marginRight: 8 }}>
        {loading ? 'Creating...' : 'Create'}
      </button>
      <button type="button" onClick={onCancel} disabled={loading}>Cancel</button>
    </form>
  );
};

export default ChallengeForm;
