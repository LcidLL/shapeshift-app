import './App.css';
import WorkoutsList from "./features/workouts/WorkoutsList"

function App() {
  return (
    <div className="App">
      <h1> Hello World </h1>
      {/* {workout#index API call} */}
      <WorkoutsList /> 
    </div>
  );
}

export default App;
