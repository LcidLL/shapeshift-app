import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import ExercisesList from "../exercises/ExercisesList";
import NewWorkoutForm from "./NewWorkoutForm"
import { useError } from "../../contexts/ErrorContext";
import { FilePenLine, Trash2, Edit } from "lucide-react";

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
    <div className="space-y-6">
      { errors && 
        errors.map((error) => (
          <div key={error.id}>
            <h2>{error}</h2>
          </div>
        )) }
        { !isDisplayed && <>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-2xl text-white flex items-center gap-3">Workout details
            <span className="flex gap-1">
              <button
                onClick={() => setIsDisplayed(true)}
                className="p-1 rounded-lg hover:bg-neutral-hover"
                title="Edit exercises"
              >
                <Edit className="w-4 h-4 text-accent-green" />
              </button>
              <button
                onClick={() => deleteWorkout(workout.id)}
                className="p-1 rounded-lg hover:bg-neutral-hover"
                title="Delete exercises"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </span>
          </h2>
        </div>
        
      <div className="bg-neutral-card rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
        <h2 className="font-heading text-xl text-white mb-4">Workout Summary</h2>
        <div className="space-y-3 text-white">
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">Workout Date:</span>
            <span>{workout.workout_date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">Type:</span>
            <span>{workout.workout_type}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">Calories Burned:</span>
            <span>{workout.calories_burned} kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">Duration:</span>
            <span>{workout.duration} min</span>
          </div>
        </div>
      </div>  
      <ExercisesList workout={workout}/>
      </>
      }
        
      {
        isDisplayed && 
        <NewWorkoutForm 
          workout={workout} 
          mode="edit" 
          onSubmit={(data) => editWorkout(data)}
          setIsDisplayed = {setIsDisplayed}
        />
      }
      
    </div>
  )
}

export default WorkoutDetails;
