import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {user?.first_name}!</h1>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-layout" style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'start'}}>
        <div className="dashboard-left-column" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          {/* Quick Stats */}
          <div className="quick-stats" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'}}>
            <div className="stat-card">
              <div className="stat-number">0</div>
              <div className="stat-label">Workouts This Week</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{user?.target_weight ? `${user.target_weight} kg` : '--'}</div>
              <div className="stat-label">Target Weight</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{user?.daily_calorie_intake || '--'}</div>
              <div className="stat-label">Daily Calorie Goal</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{user?.workout_duration ? `${user.workout_duration} min` : '--'}</div>
              <div className="stat-label">Workout Goal</div>
            </div>
          </div>
        </div>

        <div className="dashboard-right-column" style={{display: 'flex', flexDirection: 'column'}}>
          {/* Main Features Grid */}
          <div className="dashboard-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px'}}>
            <div className="dashboard-card">
              <div className="card-icon">💪</div>
              <h3 className="card-title">My Workouts</h3>
              <Link to="/workouts" className="card-link">
                View Workouts →
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🍽️</div>
              <h3 className="card-title">Meal Tracking</h3>
              <Link to="/meals" className="card-link">
                Track Meals →
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3 className="card-title">Analytics</h3>
              <Link to="/analytics" className="card-link">
                View Analytics →
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📋</div>
              <h3 className="card-title">Workout Plans</h3>
              <Link to="/plans" className="card-link">
                Browse Plans →
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">🎯</div>
              <h3 className="card-title">Challenges</h3>
              <Link to="/challenges" className="card-link">
                View Challenges →
              </Link>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⚙️</div>
              <h3 className="card-title">Profile</h3>
              <Link to="/profile" className="card-link">
                Edit Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {!user?.confirmed && (
        <div className="confirmation-notice">
          <strong>Email Confirmation Required:</strong> Please check your email and confirm your account to access all features.
        </div>
      )}
    </div>
  );
}

export default Dashboard;