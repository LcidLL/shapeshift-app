import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useParams } from "react-router-dom";
import NewExerciseForm from "./NewExerciseForm"

function ExercisePlansList(props){

  const [exercisePlans, setExercisePlans] = useState()
  const { plan_id } = useParams();
  const { dailyPlanId } = props
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [exercisePlanId, setExercisePlanId] = useState("")
  const navigate = useNavigate()
  const excludedKeys = ['id', 'daily_plan_id','created_at', 'updated_at', 'exercise_id']; 

  useEffect(()=>{
    async function loadExercisePlans(){
      try{
        const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans`);
        if (response.ok) {
          const json = await response.json();
          setExercisePlans(json);
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
    loadExercisePlans()
  },[plan_id])

  const displayEditExercisePlan = async (exerciseId) => {
    setIsDisplayed(true)
    setExercisePlanId(exerciseId)
  }

  const deleteExercisePlan = async (exercise_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
        if (!confirmed) return;
    
        const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans/${exercise_id}`, {
          method: "DELETE"
        });
    
        if(response.ok){
          const json = await response.json();
          setExercisePlans(json.data);
          navigate(`/users/1/plans/${plan_id}`);
        } else {
          console.log("Error occured")
        }    
  }

  const handleSubmitEdit= async (editedData) => {
          const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans/${exercisePlanId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(editedData)
            });
      
            if(response.ok){
              const json = await response.json();
              setExercisePlans(json)
              setIsDisplayed(false)
              navigate(`/users/1/plans/${plan_id}`);
            } else {
              console.log("Error occured")
            }
        }

  if (!exercisePlans) return(<h1>No exercise added</h1>)

  return(
    <div>
      { exercisePlans.map((exercise) => [
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
          <button onClick={() => displayEditExercisePlan(exercise.id)}>Edit</button>
          <button onClick={() => deleteExercisePlan(exercise.id)}>Delete</button>
          {
              exercise.id === exercisePlanId &&
              isDisplayed &&
              <div>
                <NewExerciseForm exercisePlan={exercise} mode="edit" onSubmit={(data) => handleSubmitEdit(data)}/>
                <p onClick={() => setIsDisplayed(false)}>Close</p>
              </div>
          }
        </div>
      ])}
    </div>
  )
}

export default ExercisePlansList;