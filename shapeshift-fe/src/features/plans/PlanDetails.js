import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";
import NewDailyPlanForm from "./NewDailyPlanForm";
import DailyPlanList from "./DailyPlanList";
import { useError } from "../../contexts/ErrorContext";
import { AlarmClock, Plus } from "lucide-react";
import { Tooltip } from "@mui/material";
import ReminderForm from "../reminders/ReminderForm";
import RemindersList from "../reminders/RemindersList";

function PlanDetails(){

  const { plan_id } = useParams();

  const [plan, setPlan] = useState("")
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [showReminderForm, setShowReminderForm] = useState(false)

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
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-2xl font-heading font-semibold text-accent-white mb-3 flex flex-row">{plan.plan_name}
          <span className="flex ml-2">
            <Tooltip title="Add Workout" placement="bottom" arrow
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
                  onClick={() => setIsDisplayed(true)}
                  className="p-1 rounded-lg hover:bg-neutral-hover"
                  title="Edit exercises"
                >
                  <Plus className="w-4 h-4 text-accent-green" />
                </button>
              </span>
            </Tooltip>
            <Tooltip title="Set Reminder" placement="bottom" arrow
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
                  onClick={() => setShowReminderForm(true)}
                  className="p-1 rounded-lg hover:bg-neutral-hover"
                >
                  <AlarmClock className="w-4 h-4 text-blue-500" />
                </button>
              </span>
            </Tooltip>
          </span>
        </h1>
      </div>
      
      <p className="text-sm font-sans text-neutral-text mb-3">{plan.description}</p>

      {isDisplayed &&
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
        <NewDailyPlanForm onTrigger={triggerRefresh} setIsDisplayed={setIsDisplayed}/>
        </div>
        }
      
        <DailyPlanList refreshFlag={refreshFlag}/>

        {showReminderForm && 
            <>
            <ReminderForm setShowReminderForm={setShowReminderForm}/>
            <RemindersList />
            </>
          }
    
    </div>
  )
}

export default PlanDetails;
