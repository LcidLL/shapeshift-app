import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import WorkoutsList from "./features/workouts/WorkoutsList"
import WorkoutDetails from './features/workouts/WorkoutDetails';
import NewWorkoutForm from './features/workouts/NewWorkoutForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* {workout#index API call} */}
        <Routes>
          <Route path = "/" element={<WorkoutsList />} />
          <Route path = "/users/1/workouts/:id" element={<WorkoutDetails />} />
          <Route path = "/users/1/workouts/new" element={<NewWorkoutForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
