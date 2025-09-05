import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Welcome, {user?.first_name}!</h1>
        <div>
          <Link to="/profile" style={{ marginRight: '15px' }}>Profile</Link>
          <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
            Logout
          </button>
        </div>
      </div>

      <div>
        <h2>Navigation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/workouts">My Workouts</Link>
          <Link to="/plans">Workout Plans</Link>
          <Link to="/profile">Manage Profile</Link>
        </div>
      </div>

      {!user?.confirmed && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7', 
          padding: '15px', 
          borderRadius: '4px',
          marginTop: '20px' 
        }}>
          <strong>Email Confirmation Required:</strong> Please check your email and confirm your account to access all features.
        </div>
      )}
    </div>
  );
}

export default Dashboard;