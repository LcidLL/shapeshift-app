import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import ExercisesList from "../exercises/ExercisesList";

function WorkoutDetails(){
  const [workout, setWorkout] = useState("")

  const { id } = useParams();

  useEffect(() => {
    async function displayWorkoutDetails(){
      try{
        const response = await fetch(`${API_URL}/users/1/workouts/${id}`);
        if (response.ok) {
          const json = await response.json();
          setWorkout(json);
          console.log(json)
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
    displayWorkoutDetails()
  }, [id])

  return (
    <div>
      <h1>Workout details</h1>
      <p>{workout.workout_type}</p>
      <p>{workout.workout_date}</p>
      <p>{workout.duration}</p>
      <p>{workout.calories_burned}</p>
      <ExercisesList workoutType = {workout.workout_type}/>
      <Link to={`/users/1/workouts/${workout.id}/exercises/new`} state={{workout}}>Add Exercise</Link>
      <Link to="/">Back</Link>
    </div>
  )
}

export default WorkoutDetails;