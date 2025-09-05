import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ExercisePlansList from "./ExercisePlansList";
import { API_URL } from "../../constants/Constants";
import NewDailyPlanForm from "./NewDailyPlanForm";
import ReminderForm from "../../features/reminders/ReminderForm"
import RemindersList from "../reminders/RemindersList";
import { useError } from "../../contexts/ErrorContext";
import { Edit, Trash2 } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import { Tooltip } from "@mui/material";
import CopyPlanForm from "./CopyPlanForm";

function DailyPlanList(props){

  const { refreshFlag, setIsDisplayedAdd, setIsAllOutdated } = props

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
  const [showCopyForm, setShowCopyForm ] = useState(false)
  const [forCopyDaily, setForCopyDaily] = useState()
  const [copyId, setCopyId ] = useState(null)
  const [rerender, setRerender] = useState(false)

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
          if(json.future.length === 0){
            setIsAllOutdated(true)
          }
        } else {
          throw response
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    displayDailyPlanDetails()
  }, [plan_id, refreshFlag, rerender])

  const deleteDailyPlan = async () => {
    const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${deleteId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if(response.ok){
      const json = await response.json();
      setOpenDelete(false);
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

 

  const handleCopy = async (daily) => {
    setShowCopyForm(true)
    setForCopyDaily(daily)
    setCopyId(daily.id)
  }

  if (!outdatedPlans.length && !futurePlans.length && !planToday.length) return (
    <div>
      <div className="relative bg-neutral-card rounded-xl p-4 flex flex-col justify-center min-h-[300px]">
        <p className="text-lg font-sans text-neutral-subtext tracking-wider text-gray-500 mb-4">--- No Workout Data ---</p>
        <button onClick={()=>setIsDisplayedAdd(true)} 
        className="w-1/4 mx-auto text-md bg-gray-800 hover:bg-gray-70 text-neutral-subtext font-semibold border-2 border-dashed border-gray-500 px-4 py-2 rounded-xl shadow">
          + Add Workout
        </button>
      </div>
  </div>
  )

  return(
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
{/* flex flex-row */}
      { outdatedPlans.map((daily) => [
        <div key={daily.id} className="relative bg-neutral-hover rounded-xl p-4 flex flex-col min-h-[500px] max-h-[600px]">
          <h3 className="text-2xl font-bold text-neutral-text">{daily.day_of_week}</h3>
          <h2 className="text-sm text-neutral-subtext mb-2">Workout name: {daily.workout_name}</h2>
          <ExercisePlansList dailyPlanId={daily.id} />
          {
            !daily.isAdded && 
            <Link to='/workouts/new' state={{daily}}
              className="w-1/2 mx-auto text-xs bg-accent-green hover:bg-green-600 text-white font-semibold px-2 py-2 rounded-xl shadow mt-2">
              Add to Tracker
            </Link>
          }
            <button onClick={()=>handleCopy(daily)}className="w-1/2 mx-auto text-xs bg-accent-green hover:bg-green-600 text-white font-semibold px-2 py-2 rounded-xl shadow mt-2">
              Copy Workout
            </button>
            { copyId === daily.id && showCopyForm && <CopyPlanForm daily={daily} setRerender={setRerender} setShowCopyForm={setShowCopyForm}/>}
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
          <h3 className="text-2xl font-bold text-neutral-text">{daily.day_of_week}</h3>
          <h2 className="text-sm text-neutral-subtext mb-2">Workout name: {daily.workout_name}</h2>
          <ExercisePlansList dailyPlanId={daily.id}/>
           {
            !daily.isAdded && 
            <Link to='/workouts/new' state={{daily}} className="w-1/2 mx-auto text-xs bg-accent-green hover:bg-green-600 text-white font-semibold px-2 py-2 rounded-xl shadow mt-2">
                Add to Tracker
            </Link>
          }
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
          <h3 className="text-2xl font-bold text-neutral-text">{daily.day_of_week}</h3>
          <h2 className="text-sm text-neutral-subtext mb-2">Workout name: {daily.workout_name}</h2>

          {
              daily.id === dailyPlanId &&
              isDisplayed &&
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                <div className="bg-neutral-card rounded-2xl shadow-lg p-6 w-full max-w-sm">
                  <NewDailyPlanForm 
                    dailyPlan={daily} 
                    mode="edit" 
                    onSubmit={(data) => handleSubmitEdit(data)}
                    setIsDisplayed={setIsDisplayed}
                  />
                </div>
              </div>
          }
          
          <ExercisePlansList dailyPlanId={daily.id}/>
          <Link to="/addExercise"  
            className="text-xs p-1 hover:bg-gray-600 transition-colors mt-1 border-2 border-dashed border-gray-500 rounded-lg"
            state={{dailyPlanId: daily.id, planId: plan_id}}>
              + Add Exercise
          </Link>
          <div className="absolute bottom-1 right-2 space-y-5">
          <Tooltip title="Edit Workout" placement="bottom" arrow
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
                  <button
                    onClick={()=> displayEditDailyPlan(daily.id)}
                    className="p-1 rounded-lg hover:bg-neutral-hover"
                  >
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                </span>
              </Tooltip>
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
              <button onClick={()=> handleDelete(daily)}
                className="p-1 rounded-lg hover:bg-neutral-hover"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </span>
          </Tooltip>
          </div>

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
