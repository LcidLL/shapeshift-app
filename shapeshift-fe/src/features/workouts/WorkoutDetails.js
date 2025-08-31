import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import ExercisesList from "../exercises/ExercisesList";
import NewWorkoutForm from "./NewWorkoutForm"
import { useError } from "../../contexts/ErrorContext";

function WorkoutDetails(){

  const { id } = useParams()
  const navigate = useNavigate()
  
  const [workout, setWorkout] = useState("")
  const [isDisplayed, setIsDisplayed] = useState(false)

  const { errors, setErrors } = useError();

  useEffect(() => {
    // clear error after displaying it once
    return () => setErrors(null);
  }, []);

  useEffect(() => {
    async function displayWorkoutDetails(){
      try{
        const response = await fetch(`${API_URL}/users/1/workouts/${id}`);
        if (response.ok) {
          const json = await response.json();
          setWorkout(json);
        } else {
          const { errors } = await response.json();
          setErrors(errors)
          navigate("/users/1/workouts")
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
    displayWorkoutDetails()
  }, [id])

  const editWorkout = async (editedData) => {
    const response = await fetch(`${API_URL}/users/1/workouts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedData)
    });

    if(response.ok){
      const json = await response.json();
      setWorkout(json)
      setIsDisplayed(false)
      navigate(`/users/1/workouts/${id}`);
    } else {
      console.log("Error occured")
    }
  }

  const deleteWorkout = async (workout_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    const response = await fetch(`${API_URL}/users/1/workouts/${workout_id}`, {
      method: "DELETE"
    });

    if(response.ok){
      navigate(`/`);
    } else {
      console.log("Error occured")
    }
  }

  return (
    <div>
      { errors && 
        errors.map((error) => (
          <div key={error.id}>
            <h2>{error}</h2>
          </div>
        )) }
      <h1>Workout details</h1>
      <button onClick={() => setIsDisplayed(true)}>Edit</button>
      <button onClick={() => deleteWorkout(workout.id)}>Delete</button>
      <p>{workout.workout_type}</p>
      <p>{workout.workout_date}</p>
      <p>{workout.duration}</p>
      <p>{workout.calories_burned}</p>

      {
        isDisplayed && 
        <NewWorkoutForm 
          workout={workout} 
          mode="edit" 
          onSubmit={(data) => editWorkout(data)}
        />
      }
      <ExercisesList workoutType = {workout.workout_type}/>
      <Link to={`/users/1/workouts/${workout.id}/exercises/new`} state={{workout}}>Add Exercise</Link>
      <Link to="/">Back</Link>
    </div>
  )
}

export default WorkoutDetails;
