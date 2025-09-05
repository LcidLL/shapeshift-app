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

  // Check for existing session on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // Validate token and get user profile
        const profileResult = await getProfile();
        if (!profileResult.success) {
          // Token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const extractTokenFromResponse = (response) => {
    const authHeader = response.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Remove 'Bearer ' prefix
    }
    return null;
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

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.data && data.data.user) {
        const jwtToken = data.data.token;
        
        if (jwtToken) {
          localStorage.setItem('token', jwtToken);
          setToken(jwtToken);
          setUser(data.data.user);
          return { success: true };
        } else {
          return {
            success: false,
            message: 'Authentication token not received'
          };
        }
      }

      return {
        success: false,
        message: data.status?.message || 'Login failed'
      };
    } catch (error) {
      console.error('Login error:', error);
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

      if (response.ok) {
        return {
          success: true,
          message: data.status?.message || 'Account created successfully'
        };
      }

      return {
        success: false,
        message: data.status?.message || 'Signup failed',
        errors: data.status?.errors || []
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const getProfile = async () => {
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      return { success: false, message: 'No token available' };
    }

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.data && data.data.user) {
        setUser(data.data.user);
        return { success: true, user: data.data.user };
      }

      return {
        success: false,
        message: data.status?.message || 'Failed to get profile'
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const updateProfile = async (profileData) => {
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: profileData }),
      });

      const data = await response.json();

      if (response.ok && data.data && data.data.user) {
        setUser(data.data.user);
        return { 
          success: true, 
          message: data.status?.message || 'Profile updated successfully' 
        };
      }

      return {
        success: false,
        message: data.status?.message || 'Failed to update profile',
        errors: data.status?.errors || []
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const logDailyWeight = async (weight) => {
    const currentToken = token || localStorage.getItem('token');
    if (!currentToken) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const response = await fetch(`${API_URL}/daily_weight`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight: parseFloat(weight) }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update user's weight in the current user state
        if (user && data.data) {
          setUser(prev => ({
            ...prev,
            weight: data.data.current_weight
          }));
        }
        
        return { 
          success: true, 
          message: data.status?.message || 'Weight logged successfully',
          data: data.data
        };
      }

      return {
        success: false,
        message: data.status?.message || 'Failed to log weight',
        errors: data.status?.errors || []
      };
    } catch (error) {
      console.error('Weight logging error:', error);
      return {
        success: false,
        message: 'Network error occurred'
      };
    }
  };

  const logout = async () => {
    const currentToken = token || localStorage.getItem('token');
    
    // Call backend logout endpoint to invalidate JWT
    if (currentToken) {
      try {
        await fetch(`${API_URL}/logout`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Logout error:', error);
        // Continue with local logout even if backend call fails
      }
    }

    // Clear local state and storage
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    token,
    login,
    signup,
    logout,
    updateProfile,
    logDailyWeight,
    getProfile,
    isAuthenticated: !!user && !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};