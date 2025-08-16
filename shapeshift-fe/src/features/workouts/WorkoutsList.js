import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import WorkoutDetails from "./WorkoutDetails.js";
import { Link } from "react-router-dom";

function WorkoutsList(){
  const [workouts, setWorkouts] = useState("");

  useEffect(() => {
    async function loadWorkouts(){
      try{
        const response = await fetch(`${API_URL}/users/1/workouts`);
        if (response.ok) {
          const json = await response.json();
          setWorkouts(json);
          console.log(json)
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }

    loadWorkouts()
  }, [])

  if (!workouts) return(<h1>Loading...</h1>)

  return(
    <div>
      <h1>Workouts</h1>
        { workouts.map((workout) => [
          <div key={workout.id}>
            <h2>{workout.workout_date}</h2>
            <h2>{workout.workout_type}</h2>
            <Link to={`/users/1/workouts/${workout.id}`}>Details</Link>
          </div>
        ])}

        <Link to='/users/1/workouts/new'>New Workout</Link>
    </div>
   
  )
}

export default WorkoutsList;
