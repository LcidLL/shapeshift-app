import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import ExercisePlansList from "./ExercisePlansList";
import { useError } from "../../contexts/ErrorContext";

const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function NewDailyPlanForm(props){

  const { onTrigger, dailyPlan, mode, onSubmit } = props

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
  }

  return(
    <div>
      <h2>{dailyPlan ? "Edit" : "Add"} Workout</h2>

      {errors && (
        <div style={{ color: "red", marginBottom: "1em" }}>
          {Array.isArray(errors)
            ? errors.map((err, index) => <div key={index}>{err}</div>)
            : <div>{errors}</div>}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <label>Workout Name</label>
        <input 
          type="text" 
          value={workoutName} 
          onChange={(e)=> setWorkoutName(e.target.value)}
          required
        />
        <label>Workout Date</label>
        <input 
          type="date" 
          min={minDate} 
          value={workoutDate} 
          onChange={(e) => handleWorkoutDateChange(e)}
          required
        />
        <button type="submit">
          {dailyPlan ? "Update" : "Add"}
        </button>
      </form>
      {dayOfWeek && <p>Day of the week: {dayOfWeek}</p>}
    </div>
  )
}

export default NewDailyPlanForm;