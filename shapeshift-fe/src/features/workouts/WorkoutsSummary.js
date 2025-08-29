import { useEffect, useState } from "react"
import { API_URL } from "../../constants/Constants"

function WorkoutsSummary(){

  const [dataSummary, setDataSummary] = useState("")

  useEffect(()=>{
    getWorkoutSummary("day")
  }, [])

  const getWorkoutSummary = async (period) => {
    try {
      const response = await fetch(`${API_URL}/users/1/workouts/summary?period=${period}`);
      if (response.ok) {
          const json = await response.json();
          setDataSummary(json);
        } else {
          throw response
        }
    } catch (e) {
      console.log("An error occured")
    }
  }

  return (
    <div>
      <button onClick={() => getWorkoutSummary("day")}>Daily</button>
      <button onClick={() => getWorkoutSummary("week")}>Weekly</button>
      <button onClick={() => getWorkoutSummary("month")}>Monthly</button>
    
    { 
      dataSummary ? 
      <div>
        {dataSummary.map((data, index) => [
          <div key={index}>
            <h2>{data.workoutPeriod}</h2>
            <p>Total Calories Burned:{data.totalCalories}</p>
            <p>Total Workout Duration: {data.totalDuration}</p>
            <p># of Workouts: {data.workoutsCount}</p>
            <p>Ave. Calories Burned:{data.averageCalories}</p>
            <p>Ave. Workout Duration: {data.averageDuration}</p>
          </div>
        ])}
      </div> : <h1>Loading data...</h1>}
    </div>
  )
}

export default WorkoutsSummary
