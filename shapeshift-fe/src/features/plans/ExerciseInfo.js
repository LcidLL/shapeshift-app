import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { useLocation } from "react-router-dom";
import NewExercisePlanForm from "./NewExercisePlanForm";

function ExerciseInfo(props){

  const [,setExerciseInfo] = useState("")
  const [isDisplayed, setIsDisplayed] = useState(false)

  const location = useLocation()
  const {exerciseInfo, exercise, dailyPlanId, planId} = location.state || {}
console.log(exerciseInfo)
  const token = localStorage.getItem('token')

  useEffect(() => {
     async function getExerciseInfo(){
      try {
        const response = await fetch(`${API_URL}/get_info?exercise_id=${exercise.exercise_id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        if (response.ok) {
            const json = await response.json();
            console.log(json)
            setExerciseInfo(json)
          } else {
            throw response
          }
      } catch (e) {
        console.log("An error occured")
      }
    }
if(!exerciseInfo){
    getExerciseInfo()
}
  }, [exercise])

  const sendToWorkoutHelper = () => {
    setIsDisplayed(true)
    console.log(planId)
  }

  return(
    <div>{exerciseInfo ? 
      <div>
        <div className="flex flex-row justify-between">
      <h1 className="text-2xl font-heading font-semibold text-accent-white mb-3 flex flex-row">Exercise Information</h1>
      
      </div>
          <div className="bg-neutral-card rounded-2xl shadow-md p-4 text-center flex flex-col w-3/4">
            <div className="flex flex-row gap-3">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Exercise name:</h3>
              <span className="text-white font-heading text-md tracking-wide">{exerciseInfo.name}</span>
            </div>
            <div className="flex flex-row gap-3">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Category:</h3>
              <span className="text-white font-heading text-md tracking-wide">
                {exerciseInfo.category.charAt(0).toUpperCase() + exerciseInfo.category.slice(1)}
                </span>
            </div>
            <div className="flex flex-row gap-3">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Level:</h3>
              <span className="text-white font-heading text-md tracking-wide">
                {exerciseInfo.level.charAt(0).toUpperCase() + exerciseInfo.level.slice(1)}
                </span>
            </div>

            <div className="flex flex-row gap-3">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Equipment:</h3>
              <span className="text-white font-heading text-md tracking-wide">
                {exerciseInfo.equipment.charAt(0).toUpperCase() + exerciseInfo.equipment.slice(1)}
              </span>
            </div>
            <div className="flex flex-row gap-3">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Primary muscle:</h3>
              <ul className="text-white font-heading text-md tracking-wide">
              {exerciseInfo.primaryMuscles.map((inst, index) => (
                  <li key={index}>{inst.charAt(0).toUpperCase() + inst.slice(1)}</li>
                ))}
                </ul>
            </div>
            <div className="flex flex-row gap-3">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Secondary muscle:</h3>
              <ul className="text-white font-heading text-md tracking-wide">
              {exerciseInfo.secondaryMuscles.map((inst, index) => (
                  <li key={index}>{inst.charAt(0).toUpperCase() + inst.slice(1)}</li>
                ))}
                </ul>
            </div>
            <div className="text-left">
              <h3 className="text-gray-400 font-heading font-semibold text-md mb-2 tracking-wide">Instructions:</h3>
              <ol className="list-decimal text-left text-md ml-4 font-sans">
                {exerciseInfo.instructions.map((inst, index) => (
                  <li key={index}>{inst}</li>
                ))}
              </ol>
            </div>
          </div>
          <button onClick={()=> sendToWorkoutHelper()} 
          className="flex mt-4 text-xs bg-accent-green hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow items-start">
            + Add to Workout
            </button>
          </div>: <div>Loading...</div>}
          {isDisplayed && <NewExercisePlanForm exercise={exercise || exerciseInfo} dailyPlanId={dailyPlanId} planId={planId} setIsDisplayed={setIsDisplayed}/>}

    </div>
  )
}

export default ExerciseInfo
