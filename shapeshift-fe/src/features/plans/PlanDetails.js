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
  const [isDisplayed, setIsDisplayed] = useState(false)

  const {errors, setErrors} = useError()
  const token = localStorage.getItem('token');

  useEffect(() => {
    // clear error after displaying it once
    return () => setErrors(null);
  }, []);

  useEffect(()=>{
    async function displayPlanDetails(){
          try{
            const response = await fetch(`${API_URL}/plans/${plan_id}`,{
              headers: {
                "Authorization": `Bearer ${token}`,
              }
            });
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
    <div className="mt-2">
      <h1 className="text-2xl font-semibold text-accent-green mb-3">{plan.plan_name}</h1>
      <p className="text-sm font-sans text-neutral-text mb-3">{plan.description}</p>
      <button 
        onClick={() => setIsDisplayed(true)} 
        className="text-xs bg-accent-green hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow mb-4">
          + Add Workout
      </button>
      {isDisplayed &&
      <>
        <NewDailyPlanForm onTrigger={triggerRefresh} setIsDisplayed={setIsDisplayed}/>
        </>
        }
      {!isDisplayed && 
      <>
        <DailyPlanList refreshFlag={refreshFlag}/>
      </>
      }
    </div>
  )
}

export default PlanDetails;
