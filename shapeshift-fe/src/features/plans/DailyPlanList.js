import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ExercisePlansList from "./ExercisePlansList";
import { API_URL } from "../../constants/Constants";
import NewDailyPlanForm from "./NewDailyPlanForm";
import ReminderForm from "../../features/reminders/ReminderForm"
import RemindersList from "../reminders/RemindersList";
import { useError } from "../../contexts/ErrorContext";
import { Trash2 } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import { Tooltip } from "@mui/material";

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
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [forDeleteDaily, setForDeleteDaily] = useState({})
  const [column, setColumn] = useState("")

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
          setColumn(json.all.length)
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

  const handleDelete = (daily) => {
    setForDeleteDaily(daily)
    setDeleteId(daily.id);
    setOpenDelete(true);
  }

  if (!outdatedPlans.length && !futurePlans.length && !planToday.length) return <h1>Loading...</h1>;

  return(
    <div className={`grid grid-cols-1 gap-1 md:grid-cols-${column}`}>
{/* flex flex-row */}
      { outdatedPlans.map((daily) => [
        <div key={daily.id} className="relative bg-neutral-hover rounded-xl p-4 flex flex-col min-h-[500px] max-h-[600px]">
          <h3 className="text-2xl font-bold text-neutral-text mb-2">{daily.day_of_week}</h3>
          <h2 className="text-neutral-subtext mb-2">{daily.workout_name}</h2>
          <ExercisePlansList dailyPlanId={daily.id} />
          {!daily.isAdded && <Link to='/workouts/new' state={{daily}}>Add to Tracker</Link>}
          <Tooltip title="Delete Workout" placement="bottom" arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}>
            <span>
              <button onClick={()=> handleDelete(daily)} className="absolute bottom-2 right-2">
                <Trash2 className="w-4 h-4 text-gray-600" />
              </button>
            </span>
          </Tooltip>
        </div>
      ])}

      { planToday.map((daily) => [
        <div key={daily.id} className="relative bg-neutral-today rounded-xl p-4 flex flex-col min-h-[500px] max-h-[600px]">
          <h3 className="text-2xl font-bold text-neutral-text mb-2">{daily.day_of_week}</h3>
          <h2 className="text-neutral-subtext mb-2">{daily.workout_name}</h2>
          {
            !daily.isAdded && 
            <Link to='/workouts/new' state={{daily}}>
                Add to Tracker
            </Link>
          }
          <ExercisePlansList dailyPlanId={daily.id}/>
          <Tooltip title="Delete Workout" placement="bottom" arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}>
            <span>
              <button onClick={()=> handleDelete(daily)} className="absolute bottom-2 right-2">
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </span>
          </Tooltip>
        </div>
      ])}

      { futurePlans.map((daily) => [
        <div key={daily.id} className="relative bg-neutral-future rounded-xl p-4 flex flex-col min-h-[500px] max-h-[600px] pb-8">
          <h3 className="text-2xl font-bold text-neutral-text mb-2">{daily.day_of_week}</h3>
          <h2 className="text-neutral-subtext mb-2">{daily.workout_name}</h2>
          <button onClick={()=> displayEditDailyPlan(daily.id)}>Edit</button>

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
          
          <ExercisePlansList dailyPlanId={daily.id}/>
          <Link to="/addExercise"  
            className="text-xs p-1 hover:bg-gray-600 transition-colors mt-1 border-2 border-dashed border-gray-500 rounded-lg"
            state={{dailyPlanId: daily.id, planId: plan_id}}>
              + Add Exercise
          </Link>
          <Tooltip title="Delete Workout" placement="bottom" arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}>
            <span>
              <button onClick={()=> handleDelete(daily)} className="absolute bottom-2 right-2">
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </span>
          </Tooltip>

        </div>
      ])}
      <ConfirmationModal
                  open={openDelete}
                  onClose={() => setOpenDelete(false)}
                  onConfirm={deleteDailyPlan}
                  daily = {forDeleteDaily}
                />
    </div>
  )
}

export default DailyPlanList;
