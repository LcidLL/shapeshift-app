import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import WorkoutsSummary from "./WorkoutsSummary";

function WorkoutsList(){
  const [workouts, setWorkouts] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    async function loadWorkouts(){
      try{
        const response = await fetch(`${API_URL}/users/1/workouts`);
        if (response.ok) {
          const json = await response.json();
          setWorkouts(json);
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
    loadWorkouts()
  }, [])

  const deleteWorkout = async (workout_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    const response = await fetch(`${API_URL}/users/1/workouts/${workout_id}`, {
      method: "DELETE"
    });

    if(response.ok){
      setWorkouts((prev) => prev.filter((workout) => workout.id !== workout_id));
      navigate(`/`);
    } else {
      console.log("Error occured")
    }
  }

  if (!workouts) return(<h1>Loading...</h1>)

  return(
    <div>
      <h1>Workouts</h1>
      <h3>Summary</h3>
      <WorkoutsSummary />
      <h3>Workout Entries</h3>
        { workouts.map((workout) => (
          <div key={workout.id}>
            <h2>{workout.workout_date}</h2>
            <h2>{workout.workout_type}</h2>
            <Link to={`/users/1/workouts/${workout.id}`}>Details</Link>
            <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
          </div>
        ))}

        <Link to='/users/1/workouts/new'>New Workout</Link>
        <Link to='/users/1/plans'>Workout Plan</Link>
    </div>
   
  )
}

export default WorkoutsList;
