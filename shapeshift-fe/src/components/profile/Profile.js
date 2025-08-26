import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function Profile() {
  const { user, updateProfile, logDailyWeight, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    age: user?.age || '',
    sex: user?.sex || '',
    weight: user?.weight || '',
    height: user?.height || '',
    daily_calorie_intake: user?.daily_calorie_intake || '',
    daily_calories_burned: user?.daily_calories_burned || '',
    workout_duration: user?.workout_duration || '',
    target_weight: user?.target_weight || ''
  });
  const [weightInput, setWeightInput] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    if (!weightInput) return;

    setLoading(true);
    setMessage('');

    const result = await logDailyWeight(weightInput);
    
    if (result.success) {
      setMessage('Weight logged successfully!');
      setWeightInput('');
    } else {
      setMessage(result.message);
    }
    
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Profile</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
          Logout
        </button>
      </div>

      {message && (
        <div style={{ color: message.includes('success') ? 'green' : 'red', marginBottom: '15px' }}>
          {message}
        </div>
      )}

      <div style={{ marginBottom: '30px' }}>
        <h2>Basic Information</h2>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Confirmed:</strong> {user.confirmed ? 'Yes' : 'No - Please check your email'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Log Daily Weight</h2>
        <form onSubmit={handleWeightSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="number"
            step="0.1"
            placeholder="Enter weight (kg)"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            style={{ padding: '8px' }}
          />
          <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
            Log Weight
          </button>
        </form>
        {user.weight && (
          <p style={{ marginTop: '10px' }}>
            <strong>Current Weight:</strong> {user.weight} kg
          </p>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Fitness Profile</h2>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            style={{ padding: '8px 16px' }}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {!isEditing ? (
          <div>
            <p><strong>Age:</strong> {user.age || 'Not set'}</p>
            <p><strong>Sex:</strong> {user.sex || 'Not set'}</p>
            <p><strong>Height:</strong> {user.height ? `${user.height} cm` : 'Not set'}</p>
            <p><strong>Daily Calorie Intake Goal:</strong> {user.daily_calorie_intake || 'Not set'}</p>
            <p><strong>Daily Calories Burned Goal:</strong> {user.daily_calories_burned || 'Not set'}</p>
            <p><strong>Workout Duration Goal:</strong> {user.workout_duration ? `${user.workout_duration} minutes` : 'Not set'}</p>
            <p><strong>Target Weight:</strong> {user.target_weight ? `${user.target_weight} kg` : 'Not set'}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>First Name</label>
              <input
                name="first_name"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Last Name</label>
              <input
                name="last_name"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Height (cm)</label>
              <input
                name="height"
                type="number"
                step="0.1"
                value={formData.height}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Daily Calorie Intake Goal</label>
              <input
                name="daily_calorie_intake"
                type="number"
                value={formData.daily_calorie_intake}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Daily Calories Burned Goal</label>
              <input
                name="daily_calories_burned"
                type="number"
                value={formData.daily_calories_burned}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Workout Duration Goal (minutes)</label>
              <input
                name="workout_duration"
                type="number"
                value={formData.workout_duration}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Target Weight (kg)</label>
              <input
                name="target_weight"
                type="number"
                step="0.1"
                value={formData.target_weight}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>

            <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;