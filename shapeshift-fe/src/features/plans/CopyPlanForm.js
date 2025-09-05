import React, { useState } from "react"
import { API_URL } from "../../constants/Constants"
import { useNavigate, useParams } from "react-router-dom"
import { X } from "lucide-react"
import { useError } from "../../contexts/ErrorContext"


function CopyPlanForm(props){

  const {daily, setShowCopyForm, setRerender} = props

  const {errors, setErrors} = useError()

  const { plan_id } = useParams()
  const navigate = useNavigate()

  const [copyDate, setCopyDate] = useState()

  const token = localStorage.getItem('token')

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const minDate = `${year}-${month}-${day}`;

  const copyToOtherDay = async () => {
    const date = new Date(copyDate);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    
    const newData = {
      workout_date: copyDate,
      day_of_week: dayOfWeek,
      workout_name: `${dayOfWeek} Workout`
    }
    
    try{
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${daily.id}/duplicate`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
      });

      if(response.ok){
        const json = await response.json();
        setShowCopyForm(false)
        setRerender(true)
      } else {
        console.log("Error occured")
      } 
    } catch (error){
      console.error("Update error:", error);
    }
  }

  return(  
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="relative bg-neutral-card rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <span onClick={() =>setShowCopyForm(false)} className="absolute top-2 right-2 hover:text-neutral-subtext hover:cursor-pointer">
            <X className="w-4 h-4 text-gray-500 hover:cursor-pointer hover:text-neutral-subtext" />
          </span>
          <p className="block text-white text-lg font-sans text-left py-2 mb-2">Set date:</p>
    <input 
      type="date" min={minDate} value={copyDate} onChange={(e) => setCopyDate(e.target.value)}
      className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
      <button onClick={() => copyToOtherDay()}
      className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-xl shadow mt-4">
        Copy Workout
      </button>
    {errors && <span>{errors}</span>}
    </div>
    </div>
  )
}

export default CopyPlanForm