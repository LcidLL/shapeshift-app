import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import ExercisePlansList from "./ExercisePlansList";
import { useError } from "../../contexts/ErrorContext";
import { X } from "lucide-react";

const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function NewDailyPlanForm(props){

  const { onTrigger, dailyPlan, mode, onSubmit, setIsDisplayed} = props

  const { plan_id } = useParams()
  const navigate = useNavigate()

  const [workoutName, setWorkoutName] = useState(dailyPlan?.workout_name || "")
  const [workoutDate, setWorkoutDate] = useState(dailyPlan?.workout_date || "")
  const [dayOfWeek, setDayOfWeek] = useState(dailyPlan?.day_of_week || "")

  //Get date today and set as minimum in date input
  const today = new Date();
  const minDate = today.toISOString().split("T")[0]

  const {errors, setErrors} = useError()

  const token = localStorage.getItem('token')

  const handleWorkoutDateChange = (e) => {
    const selectedDate = e.target.value;
    setWorkoutDate(selectedDate);

    const day = new Date(selectedDate).getDay();
    setDayOfWeek(weekdayNames[day]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dailyPlanData = {
      workout_date: workoutDate,
      workout_name: workoutName,
      day_of_week: dayOfWeek
    }

    if(mode === "edit"){
      onSubmit(dailyPlanData)
      return
    }

    try {
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dailyPlanData)
      });

      if(response.ok){
        const { id } = await response.json();
        setIsDisplayed(false)
        setWorkoutDate("")
        setWorkoutName("")
        setErrors(null)
        onTrigger()
        navigate(`/plans/${plan_id}`);
      } else {
        const { errors } = await response.json();
        setErrors(errors)
      }
    } catch (error) {
        console.error("Error submitting daily plan:", error);
        setErrors(["Something went wrong. Please try again later."]);
    }
    setIsDisplayed(false)
  }

  return(
    <div className="relative bg-neutral-card rounded-md shadow-md p-6 w-full max-w-md mx-auto">
      <span onClick={() =>setIsDisplayed(false)} className="absolute top-2 right-2 hover:text-neutral-subtext hover:cursor-pointer">
                <X className="w-4 h-4 text-gray-500 hover:cursor-pointer hover:text-neutral-subtext" />
              </span>
      <h2 className="font-heading text-xl text-white mb-4">{dailyPlan ? "Edit" : "Add"} Workout</h2>

      {errors && (
        <div style={{ color: "red", marginBottom: "1em" }}>
          {Array.isArray(errors)
            ? errors.map((err, index) => <div key={index}>{err}</div>)
            : <div>{errors}</div>}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-white text-sm mb-1 font-sans">Workout Name</label>
        <input 
          type="text" 
          value={workoutName} 
          onChange={(e)=> setWorkoutName(e.target.value)}
          required
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
        />
        <label className="block text-white text-sm mb-1 font-sans">Workout Date</label>
        <input 
          type="date" 
          min={minDate} 
          value={workoutDate} 
          onChange={(e) => handleWorkoutDateChange(e)}
          required
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
        />
        <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">
          {dailyPlan ? "Update" : "Add"}
        </button>
      </form>
      {dayOfWeek && <p className="block text-white text-sm mb-1 font-sans">Day of the week: {dayOfWeek}</p>}
    </div>
  )
}

export default NewDailyPlanForm;