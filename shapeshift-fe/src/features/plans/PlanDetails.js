import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import { Link } from "react-router-dom";
import NewDailyPlanForm from "./NewDailyPlanForm";
import DailyPlanList from "./DailyPlanList";
import { useError } from "../../contexts/ErrorContext";
import { AlarmClock, Edit, Plus } from "lucide-react";
import { Tooltip } from "@mui/material";
import ReminderForm from "../reminders/ReminderForm";
import RemindersList from "../reminders/RemindersList";
import NewPlanForm from "./NewPlanForm";

function PlanDetails(){

  const { plan_id } = useParams();

  const [plan, setPlan] = useState("")
  const [refreshFlag, setRefreshFlag] = useState(false)
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [isDisplayedEdit, setIsDisplayedEdit] = useState(false)
  const [showReminderForm, setShowReminderForm] = useState(false)
  const [isAllOutdated, setIsAllOutdated] = useState(false)

  const {errors, setErrors} = useError()
  const token = localStorage.getItem('token');

  const navigate = useNavigate()

  useEffect(() => {
    // clear error after displaying it once
    return () => setErrors(null);
  }, []);

  useEffect(()=>{
    displayPlanDetails()
  }, [plan_id])

  const displayPlanDetails = async (e) => {
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

  const triggerRefresh = () => {
    setRefreshFlag(prev => !prev); // Toggle to trigger re-render in ChildB
  };

  const handleSubmitEdit = async (editedData) => {
      try{
        const response = await fetch(`${API_URL}/plans/${plan_id}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedData)
        });
  
        if(response.ok){
          // const json = await response.json();
          setIsDisplayedEdit(false)
          await displayPlanDetails()
        } else {
          const {errors} = await response.json()
          setErrors(errors || ['Failed to edit workout plan. Please try again.'])
        }
      } catch (e) {
        setErrors(['Failed to edit workout plan. Please check your connection or try again later.'])
      }
    }


  return(
    <div className="mt-2">
      <div className="flex flex-col mb-4 text-left">
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
                >
                  <Plus className="w-4 h-4 text-violet-400" />
                </button>
              </span>
            </Tooltip>
              <Tooltip title="Edit Plan" placement="bottom" arrow
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
                    onClick={() => setIsDisplayedEdit(true)}
                    className="p-1 rounded-lg hover:bg-neutral-hover"
                    title="Edit exercises"
                  >
                    <Edit className="w-4 h-4 text-accent-green" />
                  </button>
                </span>
              </Tooltip>
          
          { !isAllOutdated &&
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
          }
          </span>
        </h1>
        <div className="text-sm font-sans text-neutral-subtext mb-3">Description: {plan.description || "no description provided"}</div>
      </div>
    
      {isDisplayed &&
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <NewDailyPlanForm onTrigger={triggerRefresh} setIsDisplayed={setIsDisplayed}/>
        </div>
        }
      
        <DailyPlanList refreshFlag={refreshFlag} setIsDisplayedAdd={setIsDisplayed} setIsAllOutdated={setIsAllOutdated}/>

        {showReminderForm && 
            <>
            <ReminderForm setShowReminderForm={setShowReminderForm} planId={plan_id}/>
            {/* <RemindersList /> */}
            </>
          }

          { isDisplayedEdit && 
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 w-full">
              <div className="relative">
                <p onClick={() => setIsDisplayedEdit(false)} className="absolute top-0 right-2 hover:cursor-pointer hover:text-neutral-subtext">x</p>
                <NewPlanForm plan={plan} mode="edit" onSubmit={(data) => handleSubmitEdit(data)}/>
              </div>
            </div>
          }
    
    </div>
  )
}

export default PlanDetails;
