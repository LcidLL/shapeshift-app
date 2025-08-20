import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useParams } from "react-router-dom";

function ExercisePlansList(props){

  const [exercisePlans, setExercisePlans] = useState()
  const { plan_id } = useParams();
  const { dailyPlanId } = props
  
  useEffect(()=>{
    async function loadExercisePlans(){
      try{
        const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${dailyPlanId}/exercise_plans`);
        if (response.ok) {
          const json = await response.json();
          setExercisePlans(json);
          console.log(json)
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
    loadExercisePlans()
  },[plan_id])

  if (!exercisePlans) return(<h1>No exercise added</h1>)

  return(
    <div>
      { exercisePlans.map((exercise) => [
        <div key={exercise.id}>
          <p>{exercise.exercise_name}</p>
        </div>
      ])}
    </div>
  )
}

export default ExercisePlansList;