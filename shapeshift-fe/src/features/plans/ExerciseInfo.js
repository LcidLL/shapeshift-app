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
            {<img src={exerciseInfo.images[0]} />}
            <ol>
              {exerciseInfo.instructions.map((inst, index) => (
                <li key={index}>{inst}</li>
              ))}
            </ol>
            <button onClick={()=> sendToWorkoutHelper()}>Add to Workout</button>
          </div> : <div>Loading...</div>}
          

          {isDisplayed && <NewExercisePlanForm exercise={exercise || exerciseInfo} dailyPlanId={dailyPlanId} planId={planId}/>}

    </div>
  )
}

export default ExerciseInfo
