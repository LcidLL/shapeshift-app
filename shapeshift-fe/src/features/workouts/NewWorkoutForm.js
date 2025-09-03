import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useError } from "../../contexts/ErrorContext";

function NewWorkoutForm(props){
  
  const { workout, mode, onSubmit, setIsDisplayed} = props

  const location = useLocation()
  const { daily } = location.state || {}
  const navigate = useNavigate()

  const { errors, setErrors } = useError()

  const [workoutType, setWorkoutType] = useState(workout?.workout_type || "")
  const [workoutDate, setWorkoutDate] = useState(workout?.workout_date || daily?.workout_date || "")
  const [duration, setDuration] = useState(workout?.duration || "")
  const [caloriesBurned, setCaloriesBurned] = useState(workout?.calories_burned || "")
  
  //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0')
  const maxDate = `${year}-${month}-${day}`

  const token = localStorage.getItem('token');

  const workoutTypeList = [
    "Strength", "Plyometrics", "Strongman",
    "Powerlifting", "Olympic Weightlifting",
    "Cardio", "Stretching"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workoutData = { 
      workout_date: workoutDate, 
      workout_type: workoutType, 
      duration: Number(duration), 
      calories_burned: Number(caloriesBurned)
    }

    if (mode === "edit"){
      onSubmit(workoutData)
    }else{
      try {
        const response = await fetch(`${API_URL}/workouts`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(workoutData)
        })

        if(response.ok){
          const { id } = await response.json();
          if (daily) {
            await updateDailyPlanStatus()
            await loadExercisePlans(id)
          }else{
            navigate(`/workouts/${id}`);
          }
        } else {
          const { errors } = await response.json()
          setErrors(errors || ['Failed to add workout. Please try again.'])
        }
      } catch (error) {
        setErrors(['Failed to add workout. Please check your connection or try again later.'])
      }
    } 
  }

  const extractMaxRep = async (input) => {
    // Use regex to find all numbers in the string
    const numbers = input.match(/\d+/g);

    // If numbers were found, return the max number
    if (numbers) {
      return Math.max(...numbers.map(Number)); // Convert strings to numbers and get the max
    }

    // If no numbers were found, return null or a default value
    return null;
  }

  const addExercisePlans = async (exercisePlans, id) => {
    for (const exercise of exercisePlans) {
      const maxRep = await extractMaxRep(exercise.reps)
      const exerciseData = { 
        exercise_name: exercise.exercise_name, 
        sets: Number(exercise.sets ?? 0), 
        reps: maxRep, 
        weight: Number(exercise.weight ?? 0), 
        intensity: exercise.intensity ?? "N/A",
        distance: Number(exercise.distance ?? 0 ),
        duration: Number(exercise.duration ?? 0),
      }
      try {
        const response = await fetch(`${API_URL}/workouts/${id}/exercises`, {
          method: "POST",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(exerciseData)
        })
    
        if(response.ok){
          await updateExercisePlanStatus(exercise)
        } else {
          const { errors } = await response.json()
          setErrors((prevErrors) => [...prevErrors, errors || `Failed to add exercise: ${exercise.exercise_name}`])
        }
      } catch (error) {
        setErrors(['Failed to add exercise to workout. Please check your connection or try again later.'])
      }
    }
    navigate(`/plans`);
  }

  const loadExercisePlans = async(id) => {
    try {
      const response = await fetch(`${API_URL}/plans/${daily.plan_id}/daily_plans/${daily.id}/exercise_plans`,{
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      if (response.ok) {
        const json = await response.json()
        await addExercisePlans(json, id)
      } else {
        const { errors } = await response.json()
        setErrors(errors || ['Failed to fetch exercise plans. Please try again.'])
      }
    } catch (error) {
      setErrors(['Failed to fetch exercise plans. Please check your connection or try again later.'])
    }
  }

  const updateExercisePlanStatus = async (exercise) => {
    try { 
      const response = await fetch(`${API_URL}/plans/${daily.plan_id}/daily_plans/${daily.id}/exercise_plans/${exercise.id}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isAdded: true})
      })
      if (!response.ok) {
        const {errors} = await response.json()
        setErrors(errors || ["Failed to update exercise plan status"])
      }
    }catch (error){
      setErrors(['Failed to update. Please check your connection or try again later.'])
    } 
  }

  const updateDailyPlanStatus = async (e) => {
    try { 
      const response = await fetch(`${API_URL}/plans/${daily.plan_id}/daily_plans/${daily.id}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({isAdded: true})
      })
  
     if (!response.ok) {
        const {errors} = await response.json()
        setErrors(errors || ["Failed to update daily plan status"])
      }
    } catch (error) {
      setErrors(['Failed to update. Please check your connection or try again later.'])
    } 
  }

  return (
    <div className="bg-neutral-card rounded-md shadow-md p-6 w-full max-w-md mx-auto">
       <h2 className="font-heading text-xl text-white mb-4">{workout ? "Update":"New"} Workout</h2>
      { errors && 
        errors.map((error) => (
          <div key={error.id}>
            <h2>{error}</h2>
          </div>
        )) }
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label for="workout-date" className="block text-white text-sm mb-1 font-sans">Workout Date</label>
          <input 
            id="workout-date" 
            value={workoutDate} 
            type="date" 
            max={maxDate} 
            onChange={(e) => setWorkoutDate(e.target.value)}
            className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
        </div>
        <div>
          <label for="workout-type"  className="block text-white text-sm mb-1 font-sans">Workout Type</label>
          <select id="workout-type" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green">
            <option value="">-- Select Workout Type --</option>
            { workoutTypeList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label for="duration" className="block text-white text-sm mb-1 font-sans">Duration</label>
          <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)} className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
        </div>
        <div>
          <label for="calories-burned" className="block text-white text-sm mb-1 font-sans">Calories Burned</label>
          <input id="calories-burned" value={caloriesBurned} type="text" onChange={(e) => setCaloriesBurned(e.target.value)}  className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
        </div>
        <div>
          <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">{workout ? "Update Workout":"Add Workout"}</button>
        </div>
      </form>
      {mode === "edit" ? <button onClick={() => setIsDisplayed(false)}>Back</button> : <Link to="users/1/workouts">Back</Link>}
    </div>
  )
}

export default NewWorkoutForm;
