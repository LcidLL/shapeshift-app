import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import AddExerciseForm from "./AddExerciseForm";

function ExercisesList(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [ exercises, setExercises ] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [selectedExerciseId, setSelectedExerciseId] = useState("")
  const [errors, setErrors] = useState("")

  const excludedKeys = ['id', 'workout_id','created_at', 'updated_at']
  
  useEffect (() => {
    async function getExercises(){
      try {
        const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises`)
        if (response.ok) {
          const json = await response.json()
          setExercises(json)
        } else {
          const { errors } = await response.json()
          setErrors(errors || ['Failed to fetch exercises. Please try again.'])
          navigate(`/users/1/workouts/`)
        }
      } catch (error) {
        setErrors(['Failed to fetch exercises. Please check your connection or try again later.'])
      }
    }
    getExercises();
  }, [id, isEditing])

  const deleteExercise = async (exercise_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this exercise?");
    if (!confirmed) return;

    try{
      const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises/${exercise_id}`, {
        method: "DELETE"
      })

      if(response.ok){
        setExercises((prev) => prev.filter((ex) => ex.id !== exercise_id))
        navigate(`/users/1/workouts/${id}`)
      } else {
        const { errors } = await response.json()
        setErrors(errors || ['Something went wrong while deleting the exercise.'])
      }
    } catch (error){
      setErrors(['Failed to delete exercise. Please check your connection or try again later.'])
    }
  }

  const editExercise = async (editedData, exercise_id) => {
    try{
      const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises/${exercise_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(editedData)
      })
      
      if(response.ok){
        setIsEditing(false)
        setSelectedExerciseId(null)
        navigate(`/users/1/workouts/${id}`)
      } else {
        const { errors } = await response.json();
        setErrors(errors || ['Something went wrong while updating exercise.']);
      }
    } catch (error){
      setErrors(['Failed to Update exercise. Please check your connection or try again later.'])
    }
  }

  const displayEditFields = async (exercise) => {
    setIsEditing(true)
    setSelectedExerciseId(exercise.id)
  }

  if (!exercises) return(<h1>Loading...</h1>)

  return(
    <div>
      <h1>Exercises</h1>
      { errors && 
        errors.map((error) => (
          <div key={error.id}>
            <h2>{error}</h2>
          </div>
        )) }
      { exercises.map((exercise) => (
        <div key={exercise.id}>
          { Object.entries(exercise
            ).filter(([key, value]) => 
              !excludedKeys.includes(key) && value !== 0 && value !== 'N/A' &&
              value !== null && value !== ''
            ).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value?.toString()}
              </li>
            ))}

          <button onClick={() => displayEditFields(exercise)}>Edit</button>
          <button onClick={() => deleteExercise(exercise.id)}>Delete</button>

          { selectedExerciseId== exercise.id && 
            isEditing && 
            <AddExerciseForm 
              exercise={exercise} 
              mode="edit" 
              onSubmit={(data) => editExercise(data, exercise.id)} 
              workoutId = {id}
            /> }
        </div>
      )) }
    </div>
  )
}

export default ExercisesList;
