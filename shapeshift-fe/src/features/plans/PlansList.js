import React, {useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import NewPlanForm from "./NewPlanForm";
import { useError } from "../../contexts/ErrorContext";
import { Tooltip } from "@mui/material";
import { Plus, X } from "lucide-react";

function PlansList() {
  const [plans, setPlans] = useState()
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [isDisplayedPlanOptions, setIsDisplayedPlanOptions] = useState(false)
  const [planId, setPlanId] = useState("")
  const navigate = useNavigate()

  const { errors, setErrors } = useError()

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function loadPlans(){
      try{
        const response = await fetch(`${API_URL}/plans`,{
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        if (response.ok) {
          const json = await response.json();
          setPlans(json);
        } else {
          setErrors(errors || ['Failed to fetch workout plans. Please try again.'])
          throw response
        }
      } catch (e) {
        setErrors(['Failed to fetch workout plans. Please check your connection or try again later.'])
      }
    }
    loadPlans()
  }, [])

  const displayEditPlan = async (planId) => {
    setIsDisplayed(true)
    setPlanId(planId)
  }

  const deletePlan = async (plan_id) => {
    try{
      const confirmed = window.confirm("Are you sure you want to delete this plan?");
      if (!confirmed) return;
  
      const response = await fetch(`${API_URL}/plans/${plan_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
  
      if(response.ok){
        setPlans((prev) => prev.filter((plan) => plan.id !== plan_id));
        navigate("/plans");
      } else {
        setErrors(['Failed to delete workout plan. Please try again.'])
      }
    } catch (e) {
      setErrors(['Failed to delete workout plan. Please check your connection or try again later.'])
    }
  }

  if (!plans) return(<h1>Loading..</h1>)

  return (
    <div>
      <div className="flex mb-4 text-left">
        <h1 className="text-2xl font-heading font-semibold text-accent-white mb-3 flex flex-row">Workout Plans
          <span className="flex ml-2">
            <Tooltip title="Add New Plan" placement="bottom" arrow
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
                  onClick={() => setIsDisplayedPlanOptions(true)}
                  className="p-1 rounded-lg hover:bg-neutral-hover"
                >
                  <Plus className="w-4 h-4 text-accent-green" />
                </button>
              </span>
            </Tooltip>
          </span>
        </h1>
      </div>
      {isDisplayedPlanOptions && 
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
        <div className="relative bg-neutral-card rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col gap-5">
          <span onClick={() =>setIsDisplayedPlanOptions(false)} className="absolute top-2 right-2 hover:text-neutral-subtext hover:cursor-pointer">
              <X className="w-4 h-4 text-gray-500 hover:cursor-pointer hover:text-neutral-subtext" />
          </span>
          <Link 
            to='/generate-workout'
            className="text-lg bg-green-800 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow">
              Generate Workout Plan
          </Link>
          <Link 
            to='/plans/new'
            className="text-lg bg-green-800 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow">
              Create Manual Plan
          </Link>
        </div>
      </div>
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      { plans.map((plan) => [
        <div key={plan.id}
        className="relative bg-neutral-card hover:bg-neutral-hover/70 rounded-2xl shadow-md p-4 w-full max-w-md mx-auto flex flex-col justify-center">
          <div className="absolute top-0 right-2 flex flex-row justify-evenly z-10">
            <Tooltip title="Delete Plan" placement="bottom" arrow
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
                <button onClick={() => deletePlan(plan.id)}>
                  <X className="w-3 h-3 text-gray-500 hover:cursor-pointer hover:text-neutral-subtext" />
                </button>
              </span>
            </Tooltip>
          </div>
        <Link to={`/plans/${plan.id}`} >
          <h1 className="text-lg font-semibold text-accent-green mb-3">{plan.plan_name}</h1>
          <p className="text-sm text-neutral-subtext mb-1">Description: {plan.description}</p>
          <p className="text-sm text-neutral-subtext mb-2">Days per week: {plan.daily_plans_count}</p>
        </Link>
        </div>
      ])}</div>
    </div>
  )
}

export default PlansList;
