import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/Constants";

function GeneratedWorkoutDetails(){

  const location = useLocation()
  const navigate = useNavigate() 
  const result = location.state?.result
  const {plan_title, week} = result
  const [startDate, setStartDate] = useState("")
  const [startDateInput, setStartDateInput] = useState(false)
  const [errors, setErrors] = useState("")
  const [hasErrors, setHasErrors] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [statuses, setStatuses] = useState("")

   //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const minDate = `${year}-${month}-${day}`;

  useEffect(() => {
  if (isDone && !hasErrors) {
    const timer = setTimeout(() => {
      navigate("/users/1/plans"); // e.g. /dashboard or /workouts
    }, 2000); // Wait 2 seconds before redirect

    return () => clearTimeout(timer);
  }
}, [isDone, hasErrors, navigate]);

  const checkIfMonday = () => {
    const date = new Date(startDate);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (dayOfWeek === "Monday"){
      addToWorkoutPlan()
      setErrors("")
    }else{
      setErrors("Start date should fall on a Monday")
    }
  }

  const addToWorkoutPlan = async () => {
    try{
      const response = await fetch(`${API_URL}/users/1/plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({plan_name: plan_title})
      });
      if(response.ok){
        const { id } = await response.json();
        await sendAllDays(id)
      } else {
        setErrors("Error creating workout")
      }
    } catch (e) {
      setErrors("Error creating workout")
    }
    setIsDone(true)
  }

  const sendAllDays = async (id) => {
    for (let index = 0; index < week.length; index++){
      const day = week[index]
      const next = new Date(startDate)
      next.setDate(next.getDate() + index);
 
      const dailyPlanData = {
        workout_date: next.toISOString().split('T')[0],
        workout_name: `${day.day} Workout`,
        day_of_week: day.day
      }
      const isValid = day.exercises && day.exercises[0]?.name;
      if (isValid) {
        await addToDailyPlan(dailyPlanData, id, index)
      } else {
        setStatuses((prev) => ({ ...prev, [day.day]: 'skipped' }));
      }
  }

  }

  const addToDailyPlan = async (data, plan_id, index) => {
    const dayName = data.day_of_week
      try{
        const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if(response.ok){
          const { id } = await response.json();
          await addToExercisePlan(plan_id, id, index, dayName)
        } else {
          setStatuses((prev) => ({ ...prev, [dayName]: 'Error creating daily plan' }));
          setHasErrors(true)
        }
      } catch (e) {
        setStatuses((prev) => ({ ...prev, [dayName]: 'Error creating daily plan' }));
        setHasErrors(true)
      }
  }

  const addToExercisePlan = async (plan_id, daily_plan_id, index, dayName) => {
    const exercises = week[index]?.exercises || [];
    for (const exercise of exercises) {
      const exerciseData = { 
        exercise_name: exercise.name,
        sets: exercise.sets, 
        reps: exercise.reps, 
        intensity: "N/A",
        distance: 0,
        duration: exercise.duration_minutes
      }
      try{
          
      const response = await fetch(`${API_URL}/users/1/plans/${plan_id}/daily_plans/${daily_plan_id}/exercise_plans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseData)
      });
  
      if(response.ok){
        const { id } = await response.json();
      } else {
        setStatuses((prev) => ({ ...prev, [dayName]: 'Error adding exercise' }));
        setHasErrors(true)
      }
      setStatuses(prev => ({ ...prev, [dayName]: 'added' }));
    } catch (e) {
      setStatuses((prev) => ({ ...prev, [dayName]: 'Error adding exercise' }));
      setHasErrors(true)
    }
    }
  }

  return(
    <div>
      <div style={{ padding: '20px' }}>
      <h2>Workout Plan Result</h2>
      <button onClick={() => setStartDateInput(true)}>
        Add to Workout Plan
      </button>
      { startDateInput && <div>
      <input type="date" min={minDate} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
       <button onClick={() => checkIfMonday()}>
        Add to Workout Plan
      </button>
      {errors && <span>{errors}</span>}
      </div>}
      <h3>{plan_title}</h3>
      { week.map((daily, i) => (
        <div key={i}>
          {daily.day} — <em>{statuses[daily.day]}</em>
          <ul>
            {daily.exercises.map((exercise, i) => (
              <li>{exercise?.name || "Rest"}</li>
            ))}
          </ul>
        </div>
      ))}
      <button onClick={() => navigate('/generate-workout')} style={{ marginTop: '20px' }}>
        Back 
      </button>
    </div>
    </div>
  )
}

export default GeneratedWorkoutDetails;