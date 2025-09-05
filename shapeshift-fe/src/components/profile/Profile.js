import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="profile-layout" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px'}}>
        <div className="profile-left-column">
          <div className="profile-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user.first_name} {user.last_name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Status</span>
                <span className={`confirmation-status ${user.confirmed ? 'confirmed' : 'unconfirmed'}`}>
                  {user.confirmed ? 'Confirmed' : 'Please check your email'}
                </span>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2 className="section-title">Log Daily Weight</h2>
            <form onSubmit={handleWeightSubmit} className="weight-log-form">
              <div className="weight-input">
                <input
                  className="form-input"
                  type="number"
                  step="0.1"
                  placeholder="Enter weight (kg)"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                />
              </div>
              <button type="submit" disabled={loading} className="log-weight-button">
                Log Weight
              </button>
            </form>
            {user.weight && (
              <div className="current-weight">
                <div className="info-item">
                  <span className="info-label">Current Weight</span>
                  <span className="info-value">{user.weight} kg</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-right-column">
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Fitness Profile</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? 'cancel-button' : 'edit-button'}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="info-item">
                  <span className="info-label">Age</span>
                  <span className="info-value">{user.age || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Sex</span>
                  <span className="info-value">{user.sex || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Height</span>
                  <span className="info-value">{user.height ? `${user.height} cm` : 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Daily Calorie Intake Goal</span>
                  <span className="info-value">{user.daily_calorie_intake || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Daily Calories Burned Goal</span>
                  <span className="info-value">{user.daily_calories_burned || 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Workout Duration Goal</span>
                  <span className="info-value">{user.workout_duration ? `${user.workout_duration} minutes` : 'Not set'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Target Weight</span>
                  <span className="info-value">{user.target_weight ? `${user.target_weight} kg` : 'Not set'}</span>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="edit-modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="edit-modal-content" style={{
            backgroundColor: '#2d2d2d',
            borderRadius: '12px',
            padding: '30px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7)',
            border: '1px solid #404040'
          }}>
            <div className="edit-modal-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid #404040'
            }}>
              <h2 className="edit-modal-title" style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#ffffff',
                margin: 0
              }}>Edit Fitness Profile</h2>
              <button 
                onClick={() => setIsEditing(false)}
                className="close-button"
                style={{
                  fontSize: '28px',
                  border: 'none',
                  background: 'none',
                  color: '#a0a0a0',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '4px',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-form-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                marginBottom: '24px'
              }}>
                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">First Name</label>
                  <input
                    className="form-input"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-input"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Age</label>
                  <input
                    className="form-input"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Sex</label>
                  <select
                    className="form-select"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Height (cm)</label>
                  <input
                    className="form-input"
                    name="height"
                    type="number"
                    step="0.1"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Daily Calorie Intake Goal</label>
                  <input
                    className="form-input"
                    name="daily_calorie_intake"
                    type="number"
                    value={formData.daily_calorie_intake}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Daily Calories Burned Goal</label>
                  <input
                    className="form-input"
                    name="daily_calories_burned"
                    type="number"
                    value={formData.daily_calories_burned}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group" style={{display: 'flex', flexDirection: 'column'}}>
                  <label className="form-label">Workout Duration Goal (minutes)</label>
                  <input
                    className="form-input"
                    name="workout_duration"
                    type="number"
                    value={formData.workout_duration}
                    onChange={handleChange}
                  />
                </div>

                <div className="modal-form-group full-width" style={{
                  display: 'flex', 
                  flexDirection: 'column',
                  gridColumn: '1 / -1'
                }}>
                  <label className="form-label">Target Weight (kg)</label>
                  <input
                    className="form-input"
                    name="target_weight"
                    type="number"
                    step="0.1"
                    value={formData.target_weight}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-form-buttons" style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
                paddingTop: '16px',
                borderTop: '1px solid #404040'
              }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)} 
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="submit-button">
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;