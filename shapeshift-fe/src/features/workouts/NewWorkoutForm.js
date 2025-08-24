import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function NewWorkoutForm(props){
  const location = useLocation();
  const { daily } = location.state || {};

  const { workout, mode, onSubmit } = props
  const [workoutType, setWorkoutType] = useState(workout?.workout_type || "")
  const [workoutDate, setWorkoutDate] = useState(workout?.workout_date || daily?.workout_date || "")
  const [duration, setDuration] = useState(workout?.duration || "")
  const [caloriesBurned, setCaloriesBurned] = useState(workout?.calories_burned || "")
  const navigate = useNavigate()
  
  //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const maxDate = `${year}-${month}-${day}`;

  const workoutTypeList = [
    "Strength", "Plyometrics", "Strongman",
    "Powerlifting", "Olympic Weightlifting",
    "Cardio", "Stretching"
  ];

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
      const response = await fetch(`${API_URL}/users/1/workouts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(workoutData)
      });

      if(response.ok){
        const { id } = await response.json();
        if (daily) {
          await updateDailyPlanStatus()
          await loadExercisePlans(id)
        }else{
        navigate(`/users/1/workouts/${id}`);
        }
      } else {
        console.log("Error occured")
      }
    } 
  }

  const addExercisePlans = async (exercisePlans, id) => {
    for (const exercise of exercisePlans) {
      const exerciseData = { 
        exercise_name: exercise.exercise_name, 
        sets: Number(exercise.sets ?? 0), 
        reps: Number(exercise.reps ?? 0), 
        weight: Number(exercise.weight ?? 0), 
        intensity: exercise.intensity ?? "N/A",
        distance: Number(exercise.distance ?? 0 ),
        duration: Number(exercise.duration ?? 0),
      }
      try {
        const response = await fetch(`${API_URL}/users/1/workouts/${id}/exercises`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(exerciseData)
        });
    
        if(response.ok){
          await updateExercisePlanStatus(exercise)
        } else {
          console.log(`Failed to add exercise: ${exercise.exercise_name}`)
        }
      }catch (error) {
        console.error("Error adding exercise to workout:", error);
      }
    }

    navigate(`/`);
  }

  const loadExercisePlans = async(id) => {
    const response = await fetch(`${API_URL}/users/1/plans/${daily.plan_id}/daily_plans/${daily.id}/exercise_plans`);
    if (response.ok) {
      const json = await response.json();
      addExercisePlans(json, id);
    } else {
      console.log("Error occured")
    }
  }

  const updateExercisePlanStatus = async (exercise) => {
    try { 
      const response = await fetch(`${API_URL}/users/1/plans/${daily.plan_id}/daily_plans/${daily.id}/exercise_plans/${exercise.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isAdded: true})
      });
  
      if (!response.ok) throw new Error("Failed to update exercise plan status");
    }catch (error){
      console.error("Error updating exercise plan status:", error);
    } 
  }

  const updateDailyPlanStatus = async (e) => {
    try { 
      const response = await fetch(`${API_URL}/users/1/plans/${daily.plan_id}/daily_plans/${daily.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({isAdded: true})
      });
  
      if (!response.ok) throw new Error("Failed to update daily plan status");
    }catch (error){
      console.error("Error updating daily plan status:", error);
    } 
  }

  return (
    <div>
      <h1>New workout</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label for="workout-date">Workout Date</label>
          <input id="workout-date" value={workoutDate} type="date" max={maxDate} onChange={(e) => setWorkoutDate(e.target.value)}></input>
        </div>
        <div>
          <label for="workout-type">Workout Type</label>
          <select id="workout-type" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
            <option value="">-- Select Workout Type --</option>
            { workoutTypeList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label for="duration">Duration</label>
          <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}></input>
        </div>
        <div>
          <label for="calories-burned">Calories Burned</label>
          <input id="calories-burned" value={caloriesBurned} type="text" onChange={(e) => setCaloriesBurned(e.target.value)}></input>
        </div>
        <div>
          <button type="submit">{workout ? "Update Workout":"Add Workout"}</button>
        </div>
      </form>
      <Link to="/">Back</Link>
    </div>
  )
}

export default NewWorkoutForm;
