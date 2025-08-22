import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import ExercisePlansList from "./ExercisePlansList";

function NewDailyPlanForm(props){

  const { onTrigger, dailyPlan, mode, onSubmit } = props
  const [workoutName, setWorkoutName] = useState(dailyPlan?.workout_name || "")
  const [dayOfWeek, setDayOfWeek] = useState(dailyPlan?.day_of_week || "")
  const [workoutDate, setWorkoutDate] = useState(dailyPlan?.workout_date || "")
  const { plan_id } = useParams()
  const navigate = useNavigate()

  //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const minDate = `${year}-${month}-${day}`;

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dailyPlanData = {
      workout_date: workoutDate,
      workout_name: workoutName,
      day_of_week: dayOfWeek
    }

    if(mode==="edit"){
      onSubmit(dailyPlanData)
    } else {
      const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dailyPlanData)
      });

      if(response.ok){
        const { id } = await response.json();
        onTrigger()
        navigate(`/users/1/plans/${plan_id}`);
      } else {
        console.log("Error occured")
      }
    }
  }

  const getDayOfWeek = async(e) => {
    const d = new Date(workoutDate);
    setDayOfWeek(weekday[d.getDay()])
  }

  return(
    <div>
      <h2>{dailyPlan ? "Edit" : "Add"} Workout</h2>
      <form onSubmit={handleSubmit}>
        <label>Workout Name</label>
        <input type="text" value={workoutName} onChange={(e)=> setWorkoutName(e.target.value)} />
        <label>Workout Date</label>
        <input type="date" min={minDate} value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)} onBlur={getDayOfWeek} />
        <button type="submit">{dailyPlan ? "Update" : "Add"}</button>
      </form>
      {dayOfWeek}
    </div>
  )
}

export default NewDailyPlanForm;