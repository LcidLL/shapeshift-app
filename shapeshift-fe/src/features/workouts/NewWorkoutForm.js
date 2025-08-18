import React, { useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NewWorkoutForm(){

  const [workoutType, setWorkoutType] = useState("")
  const [workoutDate, setWorkoutDate] = useState("")
  const [duration, setDuration] = useState("")
  const [caloriesBurned, setCaloriesBurned] = useState("")
  const navigate = useNavigate()

  //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const maxDate = `${year}-${month}-${day}`;

  const workoutTypeList = [
    "Strength",
    "Plyometrics",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting",
    "Cardio",
    "Stretching"
  ];


  const handleSubmit = async (e) => {
    e.preventDefault()

    const workoutData = { 
      workout_date: workoutDate, 
      workout_type: workoutType, 
      duration: Number(duration), 
      calories_burned: Number(caloriesBurned)
    }

    const response = await fetch(`${API_URL}/users/1/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(workoutData)
    });

    if(response.ok){
      const { id } = await response.json();
      navigate(`/users/1/workouts/${id}`);
    } else {
      console.log("Error occured")
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
          <button type="submit">Add Workout</button>
        </div>
      </form>
      <Link to="/">Back</Link>

    </div>
  )
}

export default NewWorkoutForm;
