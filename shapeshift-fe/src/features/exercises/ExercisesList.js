import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";

function ExercisesList(){
  const [ exercises, setExercises ] = useState("")
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect (() => {
    async function getExercises(){
      try {
        const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises`);
        if (response.ok) {
          const json = await response.json();
          setExercises(json);
          console.log(json)
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
    getExercises();
  }, [id])

  const deleteExercise = async (exercise_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this exercise?");
    if (!confirmed) return;

    const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises/${exercise_id}`, {
      method: "DELETE"
    });

    if(response.ok){
      setExercises((prev) => prev.filter((ex) => ex.id !== exercise_id));
      navigate(`/users/1/workouts/${id}`);
    } else {
      console.log("Error occured")
    }
  }

  if (!exercises) return(<h1>Loading...</h1>)

  return(
    <div>
      <h1>Exercises</h1>
      { exercises.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.exercise_name}</h2>
          <button onClick={() => deleteExercise(exercise.id)}>Delete</button>
        </div>
      ))}
    </div>

  )
}

export default ExercisesList;