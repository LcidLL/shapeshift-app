import { useEffect, useState } from "react"
import { API_URL } from "../../constants/Constants"
import { useError } from "../../contexts/ErrorContext";
import LineChartGraph from "../../components/LineChartGraph";
import { data } from "react-router-dom";

function WorkoutsSummary(){

  const {errors, setErrors} = useError()

  const [dataSummary, setDataSummary] = useState("")
  const [period, setPeriod] = useState("")
  const [dates, setDates] = useState("")
  const [caloriesData, setCaloriesData] = useState({})
  const [durationData, setDurationData] = useState({})
  const token = localStorage.getItem('token');

  useEffect(()=>{
    getWorkoutSummary("day")
  }, [])

  const getXAxis = async (data,period) => {
    if (period === "day") {
    const minDate = new Date(Math.min(...data.map(item => new Date(item.periodStart))))
    const maxDate = new Date(Math.max(...data.map(item => new Date(item.periodStart))))
    setDates({
      minDate,
      maxDate
    })
  }

    if (period === "week") {
      setDates(data.map(item => item.workoutPeriod))
    }
  }

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
          console.log(json)
          setDataSummary(json);
          setCaloriesData(json.map((data) => ({periodStart: data.periodStart, totalCalories: data.totalCalories})));
          setDurationData(json.map((data) => ({periodStart: data.periodStart, totalCalories: data.totalDuration})));
          setPeriod(period)
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
      {dataSummary&&<LineChartGraph dataSummary={caloriesData} period={period}/>}
      {dataSummary&&<LineChartGraph dataSummary={durationData} period={period}/>}
    </div>
  )
}

export default WorkoutsSummary
