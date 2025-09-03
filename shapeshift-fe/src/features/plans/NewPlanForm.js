import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";

function NewPlanForm(props){
  const { plan, mode, onSubmit } = props
  const [planName, setPlanName] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem('token');

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
      const response = await fetch(`${API_URL}/plans`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(planData)
      });
      if(response.ok){
        const { id } = await response.json();
        navigate(`/plans/${id}`);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors)
      }
    }
  }

  return(
    <div className="bg-neutral-card rounded-md shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="font-heading text-xl text-white mb-4">{plan ? "Update" : "New"} Workout Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label for="plan-name" className="block text-white text-sm mb-1 font-sans">Plan Name</label>
        <input id="plan-name" type="text" value={planName} onChange={(e) => setPlanName(e.target.value)}
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green" />
        <label for="plan-description" className="block text-white text-sm mb-1 font-sans">Description</label>
        <input id="plan-description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} 
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
        <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">{plan ? "Update" : "Create"} Workout</button>
      </form>
    </div>
  )
}

export default NewPlanForm;
