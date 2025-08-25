import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../constants/Constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email, password }
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const authToken = response.headers.get('Authorization');
        if (authToken) {
          const cleanToken = authToken.replace('Bearer ', '');
          localStorage.setItem('token', cleanToken);
          setToken(cleanToken);
          setUser(data.data.user);
          return { success: true };
        }
      }

      return {
        success: false,
        message: data.status?.message || 'Login failed'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: password,
            first_name: firstName,
            last_name: lastName
          }
        }),
      });

      const data = await response.json();

      return {
        success: response.ok,
        message: data.status?.message || (response.ok ? 'Registration successful' : 'Registration failed'),
        errors: data.status?.errors
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/logout`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: profileData }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        return { success: true, message: data.status.message };
      }

      return {
        success: false,
        message: data.status?.message || 'Profile update failed',
        errors: data.status?.errors
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const logDailyWeight = async (weight) => {
    try {
      const response = await fetch(`${API_URL}/profile/daily_weight`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { weight } }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the user's weight in the context
        setUser(prev => ({ ...prev, weight: parseFloat(weight) }));
        return { success: true, data: data.data };
      }

      return {
        success: false,
        message: data.status?.message || 'Weight logging failed'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    logDailyWeight,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};