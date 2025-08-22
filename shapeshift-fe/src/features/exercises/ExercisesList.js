import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import AddExerciseForm from "./AddExerciseForm";

function ExercisesList(){
  const [ exercises, setExercises ] = useState("")
  const [isDisplayed, setIsDisplayed] =useState("")
  const [exerciseId, setExerciseId] = useState("")
  const { id } = useParams();
  const navigate = useNavigate();
  const excludedKeys = ['id', 'workout_id','created_at', 'updated_at']; 
  
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
  }, [id, isDisplayed])

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

  const editExercise = async (editedData, exercise_id) => {
    const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises/${exercise_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedData)
    });
    
    if(response.ok){
      // const json = await response.json();
      // setExercises((prev))
      setIsDisplayed(false)
      navigate(`/users/1/workouts/${id}`);
    } else {
      console.log("Error occured")
    }
  }

  const displayEditFields = async (exercise) => {
    setIsDisplayed(true)
    setExerciseId(exercise.id)
  }

  if (!exercises) return(<h1>Loading...</h1>)

  return(
    <div>
      <h1>Exercises</h1>
      { 
        exercises.map((exercise) => (
          <div key={exercise.id}>
            {
              Object.entries(exercise
                ).filter(([key, value]) => 
                  !excludedKeys.includes(key) && 
                  value !== 0 && 
                  value !== 'N/A' &&
                  value !== null &&
                  value !== ''
                ).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value?.toString()}
                  </li>
                ))
            }
            <button onClick={() => displayEditFields(exercise)}>Edit</button>
            <button onClick={() => deleteExercise(exercise.id)}>Delete</button>
            {
              exerciseId== exercise.id && 
              isDisplayed && 
              <AddExerciseForm 
                exercise={exercise} 
                mode="edit" 
                onSubmit={(data) => editExercise(data, exercise.id)} 
                workoutId = {id}
              />
            }
          </div>
        ))
      }
    </div>
  )
}

export default ExercisesList;
