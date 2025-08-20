import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExercisePlansList from "./ExercisePlansList";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";

function DailyPlanList(){

  const [ dailyPlan, setDailyPlan] = useState("")
  const { plan_id } = useParams();

  useEffect(()=>{
    async function displayDailyPlanDetails(){
          try{
            const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans`);
            if (response.ok) {
              const json = await response.json();
              setDailyPlan(json);
              console.log(json)
            } else {
              throw response
            }
          } catch (e) {
            console.log("An error occured")
          }
        }
        displayDailyPlanDetails()
  }, [plan_id])

  if(!dailyPlan) return(<h1>Loading...</h1>)

  return(
    <div>
      { dailyPlan.map((daily) => [
        <div key={daily.id}>
          <h1>{daily.day_of_week}</h1>
          <h2>{daily.workout_name}</h2>
          <ExercisePlansList dailyPlanId={daily.id}/>
          <Link to="/addExercise" state={{dailyPlanId: daily.id, planId: plan_id}}>Add Exercise</Link>
        </div>
      ])}
    </div>
  )
}

export default DailyPlanList;
