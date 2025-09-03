import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useParams } from "react-router-dom";
import NewExerciseForm from "./NewExerciseForm"

function ExercisePlansList(props){

  const { dailyPlanId, date } = props

  const [exercisePlans, setExercisePlans] = useState()
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [exercisePlanId, setExercisePlanId] = useState("")

  const { plan_id } = useParams();
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const excludedKeys = [
    'id', 'daily_plan_id','created_at', 'updated_at', 
    'exercise_id', 'workout_date', 'isAdded'
  ]; 

  const today = new Date().toISOString().split('T')[0];

  useEffect(()=>{
    loadExercisePlans()
  },[plan_id])

  const loadExercisePlans = async () => {
    try{
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans`,{
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      if (response.ok) {
        const json = await response.json();
        setExercisePlans(json);
      } else {
        throw new Error("Failed to fetch exercises");
      }
    } catch (e) {
      console.error("An error occurred while fetching exercises:", e);
    }
  }
  

  const displayEditExercisePlan = (exerciseId) => {
    setIsDisplayed(true)
    setExercisePlanId(exerciseId)
  }

  const deleteExercisePlan = async (exercise_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;
    
    try {
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans/${exercise_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
    
      if(response.ok){
        await loadExercisePlans()
        navigate(`/plans/${plan_id}`);
      } else {
        throw new Error("Failed to delete");
      }   
    } catch (e) {
      console.error("Error deleting exercise plan:", e);
    }
  }

  const handleSubmitEdit= async (editedData) => {
    try {
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans/${exercisePlanId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData)
      })

      if(response.ok){
        await loadExercisePlans();
        setIsDisplayed(false)
        navigate(`/plans/${plan_id}`);
      } else {
         throw new Error("Failed to update exercise");
      }
    } catch(e) {
      console.error("Error updating exercise plan:", e);
    }
  }

  if (!exercisePlans || exercisePlans.length === 0) {
    return(<h1>No exercise added</h1>)
  }

  return(
    <div className="space-y-2 text-white text-sm">
      { exercisePlans.map((exercise) => [
        <div key={exercise.id} className="bg-neutral-card rounded-lg p-2 hover:bg-neutral-hover/70 transition-colors">
            <p className="font-medium">{exercise.exercise_name}</p>
            {exercise.sets && (
              <p className="text-gray-400 text-xs">
                {exercise.sets} sets × {exercise.reps} reps
              </p>
            )}
            {/* {dayPlan.type === "Cardio" && (
              <p className="text-gray-400 text-xs">
                {ex.distance} · {ex.intensity} · {ex.duration}
              </p>
            )} */}
          { exercise.workout_date > today && 
            <div>
              <button onClick={() => displayEditExercisePlan(exercise.id)}>Edit</button>
              <button onClick={() => deleteExercisePlan(exercise.id)}>Delete</button>
            </div>
          }
          {
            exercise.id === exercisePlanId &&
            isDisplayed &&
            <div>
              <NewExerciseForm 
                exercisePlan={exercise} 
                mode="edit" 
                onSubmit={(data) => handleSubmitEdit(data)}
              />
              <p onClick={() => setIsDisplayed(false)}>Close</p>
            </div>
          }
        </div>
      ])}
    </div>
  )
}

export default ExercisePlansList;