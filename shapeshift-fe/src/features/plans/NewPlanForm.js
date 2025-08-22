import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

function NewPlanForm(props){
  const { plan, mode, onSubmit } = props
  const [planName, setPlanName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if(plan){
      setPlanName(plan.plan_name)
      setDescription(plan.description)
    }
  }, [plan])

  const handleSubmit = async(e) => {
    e.preventDefault()

    const planData = {
      plan_name: planName,
      description: description
    }

    if (mode==="edit"){
      onSubmit(planData)
    }else{
      const response = await fetch(`${API_URL}/users/1/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(planData)
      });
      if(response.ok){
        const { id } = await response.json();
        navigate(`/users/1/plans/${id}`);
      } else {
        console.log("Error occured")
      }
    }
  }

  return(
    <div>
      <h1>New Workout Plan</h1>
      <form onSubmit={handleSubmit}>
        <label for="plan-name">Plan Name</label>
        <input id="plan-name" type="text" value={planName} onChange={(e) => setPlanName(e.target.value)}></input>
        <label for="plan-description">Description</label>
        <input id="plan-description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)}></input>
        <button type="submit">{plan ? "Update" : "Create"} Workout</button>
      </form>
    </div>
  )
}

export default NewPlanForm;
