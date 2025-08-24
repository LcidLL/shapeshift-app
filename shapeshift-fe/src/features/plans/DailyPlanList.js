import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExercisePlansList from "./ExercisePlansList";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";
import NewDailyPlanForm from "./NewDailyPlanForm";

function DailyPlanList(props){

  const { refreshFlag } = props
  const [ dailyPlan, setDailyPlan] = useState("")
  const [ outdatedPlan, setOutdatedPlan] = useState("")
  const [ futurePlan, setFuturePlan] = useState("")
  const { plan_id } = useParams();
  const [dailyPlanId, setDailyPlanId] = useState("")
  const [isDisplayed, setIsDisplayed] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    async function displayDailyPlanDetails(){
          try{
            const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans`);
            if (response.ok) {
              const json = await response.json();
              setDailyPlan(json.all);
              setOutdatedPlan(json.oudated);
              setFuturePlan(json.future);
              console.log(json)
            } else {
              throw response
            }
          } catch (e) {
            console.log("An error occured")
          }
        }
        displayDailyPlanDetails()
  }, [plan_id, refreshFlag])

  const deleteDailyPlan = async (daily_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${daily_id}`, {
      method: "DELETE"
    });

    if(response.ok){
      const json = await response.json();
      setDailyPlan(json.data);
      navigate(`/users/1/plans/${plan_id}`);
    } else {
      console.log("Error occured")
    }
  }

  const displayEditDailyPlan = async (dailyId) => {
    setIsDisplayed(true)
    setDailyPlanId(dailyId)
   }

    const handleSubmitEdit = async (editedData) => {
      const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${dailyPlanId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedData)
        });
  
        if(response.ok){
          const json = await response.json();
          setDailyPlan(json);
          setIsDisplayed(false)
          navigate(`/users/1/plans/${plan_id}`);
        } else {
          console.log("Error occured")
        }
    }

  if(!dailyPlan) return(<h1>Loading...</h1>)

  return(
    <div>
      { outdatedPlan.map((daily) => [
        <div key={daily.id}>
          <h1>{daily.day_of_week}</h1>
          <h2>{daily.workout_name}</h2>
          {!daily.isAdded && <Link to='/users/1/workouts/new' state={{daily}}>Add to Tracker</Link>}
          <button onClick={()=> deleteDailyPlan(daily.id)}>Delete</button>
          <ExercisePlansList dailyPlanId={daily.id} date="oudated"/>
        </div>
      ])}

      { futurePlan.map((daily) => [
        <div key={daily.id}>
          <h1>{daily.day_of_week}</h1>
          <h2>{daily.workout_name}</h2>
          <button onClick={()=> displayEditDailyPlan(daily.id)}>Edit</button>
          <button onClick={()=> deleteDailyPlan(daily.id)}>Delete</button>
          {
              daily.id === dailyPlanId &&
              isDisplayed &&
              <div>
                <NewDailyPlanForm dailyPlan={daily} mode="edit" onSubmit={(data) => handleSubmitEdit(data)}/>
                <p onClick={() => setIsDisplayed(false)}>Close</p>
              </div>
          }
          <ExercisePlansList dailyPlanId={daily.id}/>
          <Link to="/addExercise" state={{dailyPlanId: daily.id, planId: plan_id}}>Add Exercise</Link>
        </div>
      ])}
    </div>
  )
}

export default DailyPlanList;
