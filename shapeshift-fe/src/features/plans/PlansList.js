import React, {useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import NewPlanForm from "./NewPlanForm";
import { useError } from "../../contexts/ErrorContext";

function PlansList() {
  const [plans, setPlans] = useState()
  const [isDisplayed, setIsDisplayed] = useState(false)
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

  const handleSubmitEdit = async (editedData) => {
    try{
      const response = await fetch(`${API_URL}/plans/${planId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData)
      });

      if(response.ok){
        // const json = await response.json();
        setIsDisplayed(false)
        navigate(`/plans/${planId}`);
      } else {
        const {errors} = await response.json()
        setErrors(errors || ['Failed to edit workout plan. Please try again.'])
      }
    } catch (e) {
      setErrors(['Failed to edit workout plan. Please check your connection or try again later.'])
    }
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
      <h2>Plans</h2>
      <Link to='/generate-workout'>Generate Workout Plan</Link>
      <Link to='/plans/new'>New Workout Plan</Link>
      { plans.map((plan) => [
        <div key={plan.id}>
          <h1>{plan.plan_name}</h1>
          <button onClick={()=> displayEditPlan(plan.id)}>Edit</button>
          <button onClick={()=> deletePlan(plan.id)}>Delete</button>
          <Link to={`/plans/${plan.id}/`}>Details</Link>
          { planId == plan.id && isDisplayed && 
            <div>
              <NewPlanForm plan={plan} mode="edit" onSubmit={(data) => handleSubmitEdit(data)}/>
              <p onClick={() => setIsDisplayed(false)}>Close</p>
            </div>
          }
                   
        </div>
      ])}
    </div>
  )
}

export default PlansList;
