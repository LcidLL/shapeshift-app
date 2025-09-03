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

  const token = localStorage.getItem('token')

   //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const minDate = `${year}-${month}-${day}`;

  useEffect(() => {
  if (isDone && !hasErrors) {
    const timer = setTimeout(() => {
      navigate("/plans");
    }, 2000);

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
      const response = await fetch(`${API_URL}/plans`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
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
        const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if(response.ok){
          const { id } = await response.json();
          console.log(id)
          await addToExercisePlan(plan_id, id, index, dayName)
        } else {
          setStatuses((prev) => ({ ...prev, [dayName]: 'Failed creating daily plan' }));
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
          
      const response = await fetch(`${API_URL}/plans/${plan_id}/daily_plans/${daily_plan_id}/exercise_plans`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        { week.map((daily, i) => (
          <div key={i} className="bg-neutral-hover rounded-xl p-4 flex flex-col">
            <h3 className="text-lg font-semibold text-accent-green mb-3">{daily.day} — <em>{statuses[daily.day]}</em></h3> 
            <ul className="space-y-2 text-white text-sm">
              {daily.exercises.map((exercise, i) => (
                <li key={i} 
                  className="bg-neutral-card rounded-lg p-2 hover:bg-neutral-hover/70 transition-colors"
                >
                  <p className="font-medium">{exercise?.name || "Rest"}</p>
                  {exercise.sets && (
                    <p className="text-gray-400 text-xs">
                    {exercise.sets} { exercise.sets > 1 ? "sets" : "set"} × {exercise.reps !== "" ? `${exercise.reps} reps` : `${exercise.duration_minutes} mins`}
                    </p>
                   )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/generate-workout')} style={{ marginTop: '20px' }}>
        Back 
      </button>
    </div>
    </div>
  )
}

export default GeneratedWorkoutDetails;