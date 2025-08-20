import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import WorkoutsList from "./features/workouts/WorkoutsList"
import WorkoutDetails from './features/workouts/WorkoutDetails';
import NewWorkoutForm from './features/workouts/NewWorkoutForm';
import AddExerciseForm from './features/exercises/AddExerciseForm';
import PlanList from './features/plans/PlansList';
import PlanDetails from './features/plans/PlanDetails';
import NewPlanForm from './features/plans/NewPlanForm';
import NewExerciseForm from './features/plans/NewExerciseForm';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* {workout#index API call} */}
        <Routes>
          <Route path = "/" element={<WorkoutsList />} />
          <Route path = "/users/1/workouts/:id" element={<WorkoutDetails />} />
          <Route path = "/users/1/workouts/new" element={<NewWorkoutForm />} />
          <Route path = "/users/1/workouts/:workout_id/exercises/new" element={<AddExerciseForm />} />
          <Route path = "/users/1/plans" element={<PlanList />} />
          <Route path = "/users/1/plans/:plan_id" element={<PlanDetails />} />
          <Route path = "/users/1/plans/new" element={<NewPlanForm />} />
          <Route path = "/addExercise" element={<NewExerciseForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
