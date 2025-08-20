import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";
import NewDailyPlanForm from "./NewDailyPlanForm";
import DailyPlanList from "./DailyPlanList";

function PlanDetails(){

  const [plan, setPlan] = useState("")
  const { plan_id } = useParams();

  useEffect(()=>{
    async function displayPlanDetails(){
          try{
            const response = await fetch(`${API_URL}/users/1/plans/${plan_id}`);
            if (response.ok) {
              const json = await response.json();
              setPlan(json);
              console.log(json)
            } else {
              throw response
            }
          } catch (e) {
            console.log("An error occured")
          }
        }
        displayPlanDetails()
      }, [plan_id])



  return(
    <div>
      <h1>{plan.plan_name}</h1>
      <p>{plan.description}</p>
      <NewDailyPlanForm />
      <DailyPlanList />
    </div>
  )
}
export default PlanDetails;
