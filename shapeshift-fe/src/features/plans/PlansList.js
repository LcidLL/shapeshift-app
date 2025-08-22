import React, {useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import NewPlanForm from "./NewPlanForm";

function PlansList() {
  const [plans, setPlans] = useState()
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [planId, setPlanId] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
      async function loadPlans(){
        try{
          const response = await fetch(`${API_URL}/users/1/plans`);
          if (response.ok) {
            const json = await response.json();
            setPlans(json);
          } else {
            throw response
          }
        } catch (e) {
          console.log("An error occured")
        }
      }
      loadPlans()
    }, [])

    const displayEditPlan = async (planId) => {
      setIsDisplayed(true)
      setPlanId(planId)
    }

    const handleSubmitEdit = async (editedData) => {
          const response = await fetch(`${API_URL}/users/1/plans/${planId}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(editedData)
            });
      
            if(response.ok){
              const json = await response.json();
              setIsDisplayed(false)
              navigate(`/users/1/plans/${planId}`);
            } else {
              console.log("Error occured")
            }
        }
    

  if (!plans) return(<h1>Loading..</h1>)

  return (
    <div>
      <h2>Plans</h2>
      <Link to='/users/1/plans/new'>New Workout Plan</Link>
      { plans.map((plan) => [
        <div key={plan.id}>
          <h1>{plan.plan_name}</h1>
          <button onClick={()=> displayEditPlan(plan.id)}>Edit</button>
          <Link to={`/users/1/plans/${plan.id}/`}>Details</Link>
          { planId == plan.id && isDisplayed && <NewPlanForm plan={plan} mode="edit" onSubmit={(data) => handleSubmitEdit(data)}/>}
        </div>
      ])}
    </div>
  )
}

export default PlansList;
