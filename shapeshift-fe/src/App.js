import { Routes, Route, BrowserRouter, Navigate, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/profile/Profile';
import MealsList from './features/meals/MealsList';

import WorkoutsList from "./features/workouts/WorkoutsList"
import WorkoutDetails from './features/workouts/WorkoutDetails';
import NewWorkoutForm from './features/workouts/NewWorkoutForm';
import AddExerciseForm from './features/exercises/AddExerciseForm';
import PlanList from './features/plans/PlansList';
import PlanDetails from './features/plans/PlanDetails';
import NewPlanForm from './features/plans/NewPlanForm';
import NewExerciseForm from './features/plans/NewExerciseForm';
import GenerateWorkoutForm from './features/plans/GenerateWorkoutForm';
import GeneratedWorkoutDetails from './features/plans/GeneratedWorkoutDetails';
import { useError } from './contexts/ErrorContext';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Layout  from './components/Layout';
import WorkoutsSummary from './features/workouts/WorkoutsSummary';
import Analytics from './components/Analytics';
import ExerciseInfo from './features/plans/ExerciseInfo';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />

            <Route path="/meals" element={
              <ProtectedRoute>
                <MealsList />
              </ProtectedRoute>
            } />
            
            <Route path="/workouts" element={
              <ProtectedRoute>
                <WorkoutsList />
              </ProtectedRoute>
            } />
            
            <Route path="/workouts/:id" element={
              <ProtectedRoute>
                <WorkoutDetails />
              </ProtectedRoute>
            } />
            
            <Route path="/workouts/new" element={
              <ProtectedRoute>
                <NewWorkoutForm />
              </ProtectedRoute>
            } />
            
            <Route path="/workouts/:workout_id/exercises/new" element={
              <ProtectedRoute>
                <AddExerciseForm />
              </ProtectedRoute>
            } />
            
            <Route path="/plans" element={
              <ProtectedRoute>
                <PlanList />
              </ProtectedRoute>
            } />
            
            <Route path="/plans/:plan_id" element={
              <ProtectedRoute>
                <PlanDetails />
              </ProtectedRoute>
            } />
            
            <Route path="/plans/new" element={
              <ProtectedRoute>
                <NewPlanForm />
              </ProtectedRoute>
            } />
            
            <Route path="/addExercise" element={
              <ProtectedRoute>
                <NewExerciseForm />
              </ProtectedRoute>
            } />

             <Route path="/exercise-info" element={
              <ProtectedRoute>
                <ExerciseInfo />
              </ProtectedRoute>
            } />

            <Route path = "/generate-workout" element={<GenerateWorkoutForm />} />
            <Route path = "/generate-workout-results" element={<GeneratedWorkoutDetails />} />
            
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

             {/* {Redirect to dashboard if route not found in react}  */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            
          </Routes>
          </Layout>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;