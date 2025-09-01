import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";
import NewDailyPlanForm from "./NewDailyPlanForm";
import DailyPlanList from "./DailyPlanList";
import { useError } from "../../contexts/ErrorContext";

function PlanDetails(){

  const { plan_id } = useParams();

  const [plan, setPlan] = useState("")
  const [refreshFlag, setRefreshFlag] = useState(false)

  const {errors, setErrors} = useError()

  useEffect(() => {
    // clear error after displaying it once
    return () => setErrors(null);
  }, []);

  useEffect(()=>{
    async function displayPlanDetails(){
          try{
            const response = await fetch(`${API_URL}/users/1/plans/${plan_id}`);
            if (response.ok) {
              const json = await response.json();
              setPlan(json);
            } else {
              throw response
            }
          } catch (e) {
            console.log("An error occured")
          }
        }
        displayPlanDetails()
      }, [plan_id])

  const triggerRefresh = () => {
    setRefreshFlag(prev => !prev); // Toggle to trigger re-render in ChildB
  };


  return(
    <div>
      <h1>{plan.plan_name}</h1>
      <p>{plan.description}</p>
      <NewDailyPlanForm onTrigger={triggerRefresh}  />
      <DailyPlanList refreshFlag={refreshFlag}/>
      <Link to={`/users/1/plans/`}>Back</Link>
    </div>
  )
}

export default PlanDetails;
