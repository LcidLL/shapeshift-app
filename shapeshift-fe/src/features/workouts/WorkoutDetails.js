import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useParams } from "react-router-dom"

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
    <div></div>
  )
}

export default WorkoutDetails;