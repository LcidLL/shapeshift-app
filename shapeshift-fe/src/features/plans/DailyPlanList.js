import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ExercisePlansList from "./ExercisePlansList";
import { API_URL } from "../../constants/Constants";
import NewDailyPlanForm from "./NewDailyPlanForm";
import ReminderForm from "../../features/reminders/ReminderForm"
import RemindersList from "../reminders/RemindersList";
import { useError } from "../../contexts/ErrorContext";

function DailyPlanList(props){

  const { refreshFlag } = props

  const { plan_id } = useParams()
  const navigate = useNavigate()

  const [planToday, setPlanToday] = useState("")
  const [outdatedPlans, setOutdatedPlans] = useState("")
  const [futurePlans, setFuturePlans] = useState("")
  const [dailyPlanId, setDailyPlanId] = useState("")
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [showReminderForm, setShowReminderForm] = useState(false)

  const token = localStorage.getItem('token')

  useEffect(()=>{
    async function displayDailyPlanDetails(){
      try{
        const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans`,{
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        if (response.ok) {
          const json = await response.json()
          setPlanToday(json.today)
          setOutdatedPlans(json.outdated)
          setFuturePlans(json.future)
        } else {
          throw response
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    displayDailyPlanDetails()
  }, [plan_id, refreshFlag])

  const deleteDailyPlan = async (daily_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${daily_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if(response.ok){
      const json = await response.json();
      setPlanToday(json.today)
      setOutdatedPlans(json.outdated)
      setFuturePlans(json.future)
      navigate(`/plans/${plan_id}`);
    } else {
      console.log("Error occured")
    }
  }

  const displayEditDailyPlan = async (dailyId) => {
    setIsDisplayed(true)
    setDailyPlanId(dailyId)
  }

  const handleSubmitEdit = async (editedData) => {
    try{
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${dailyPlanId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData)
      });

      if(response.ok){
        const json = await response.json();
        setFuturePlans((prev) =>
          prev.map((plan) => (plan.id === dailyPlanId ? json : plan))
        )
        setIsDisplayed(false)
        navigate(`/plans/${plan_id}`);
      } else {
        console.log("Error occured")
      } 
    } catch (error){
      console.error("Update error:", error);
    }
  }

  const getReminderForm = async (dailyId) => {
    setShowReminderForm(true)
    setDailyPlanId(dailyId)
  }

  if (!outdatedPlans.length && !futurePlans.length && !planToday.length) return <h1>Loading...</h1>;

  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      { planToday.map((daily) => [
        <div key={daily.id} className="bg-neutral-hover rounded-xl p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-accent-green mb-3">{daily.day_of_week}</h3>
          <h2>{daily.workout_name}</h2>
          {
            !daily.isAdded && 
            <Link to='/workouts/new' state={{daily}}>
                Add to Tracker
            </Link>
          }
          <button onClick={()=> deleteDailyPlan(daily.id)}>
            Delete
          </button>
          <ExercisePlansList dailyPlanId={daily.id}/>
                    <button onClick={() => getReminderForm(daily.id)}>Set Reminder</button>
          {
            daily.id === dailyPlanId && 
            showReminderForm && 
            <ReminderForm daily={daily} setShowReminderForm={setShowReminderForm}/>
          }
        </div>
      ])}

      { outdatedPlans.map((daily) => [
        <div key={daily.id} className="bg-neutral-hover rounded-xl p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-accent-green mb-3">{daily.day_of_week}</h3>
          <h2>{daily.workout_name}</h2>
          {!daily.isAdded && <Link to='/workouts/new' state={{daily}}>Add to Tracker</Link>}
          <button onClick={()=> deleteDailyPlan(daily.id)}>Delete</button>
          <ExercisePlansList dailyPlanId={daily.id} />
        </div>
      ])}

      { futurePlans.map((daily) => [
        <div key={daily.id} className="bg-neutral-hover rounded-xl p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-accent-green mb-3">{daily.day_of_week}</h3>
          <h2>{daily.workout_name}</h2>
          <button onClick={()=> displayEditDailyPlan(daily.id)}>Edit</button>
          <button onClick={()=> deleteDailyPlan(daily.id)}>Delete</button>
          {
              daily.id === dailyPlanId &&
              isDisplayed &&
              <div>
                <NewDailyPlanForm 
                  dailyPlan={daily} 
                  mode="edit" 
                  onSubmit={(data) => handleSubmitEdit(data)}
                />
                <p onClick={() => setIsDisplayed(false)}>Close</p>
              </div>
          }
          <button onClick={() => getReminderForm(daily.id)}>Set Reminder</button>
          {
            daily.id === dailyPlanId && 
            showReminderForm && 
            <ReminderForm daily={daily} setShowReminderForm={setShowReminderForm}/>
          }
          <RemindersList daily={daily}/>
          <ExercisePlansList dailyPlanId={daily.id}/>
          <Link to="/addExercise" state={{dailyPlanId: daily.id, planId: plan_id}}>Add Exercise</Link>
        </div>
      ])}
    </div>
  )
}

export default DailyPlanList;
