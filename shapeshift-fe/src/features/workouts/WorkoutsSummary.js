import { useEffect, useState } from "react"
import { API_URL } from "../../constants/Constants"
import { useError } from "../../contexts/ErrorContext";

function WorkoutsSummary(){

  const {errors, setErrors} = useError()

  const [dataSummary, setDataSummary] = useState("")
  const token = localStorage.getItem('token');

  useEffect(()=>{
    getWorkoutSummary("day")
  }, [])

  const getWorkoutSummary = async (period) => {
    try {
      const response = await fetch(`${API_URL}/workouts/summary?period=${period}`,{
        headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      })
      if (response.ok) {
          const json = await response.json();
          setDataSummary(json);
        } else {
          setErrors(["Failed to fetch workout summary."])
        }
    } catch (error) {
      setErrors(["Failed to fetch workout summary."])
    }
  }

  return (
    <div>
      <button onClick={() => getWorkoutSummary("day")}>Daily</button>
      <button onClick={() => getWorkoutSummary("week")}>Weekly</button>
      <button onClick={() => getWorkoutSummary("month")}>Monthly</button>
    
    { 
      dataSummary ? 
      <div className="flex flex row">
        {dataSummary.map((data, index) => [
          <div key={index} className="bg-neutral-card rounded-2xl shadow-md p-4">
            <h2>{data.workoutPeriod}</h2>
            <p>Total Calories Burned:{data.totalCalories}</p>
            <p>Total Workout Duration: {data.totalDuration}</p>
            <p># of Workouts: {data.workoutsCount}</p>
            <p>Ave. Workout Duration: {data.averageDuration}</p>
          </div>
        ])}
      </div> : <h1>Loading data...</h1>}
    </div>
  )
}

export default WorkoutsSummary
