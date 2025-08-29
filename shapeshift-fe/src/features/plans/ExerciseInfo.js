import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";

function ExerciseInfo(props){

  const { exerciseId } = props

  const [exerciseInfo, setExerciseInfo] = useState("")

  useEffect(() => {
     async function getExerciseInfo(){
      try {
        const response = await fetch(`${API_URL}/users/1/get_info?exercise_id=${exerciseId}`);
        if (response.ok) {
            const json = await response.json();
            setExerciseInfo(json)
          } else {
            throw response
          }
      } catch (e) {
        console.log("An error occured")
      }
    }

    getExerciseInfo()
  }, [exerciseId])

 

  return(
    <div>
      {
        exerciseInfo ? 
          <div>
            {<img src={exerciseInfo.images[1]} />}
            <ol>
              {exerciseInfo.instructions.map((inst, index) => (
                <li key={index}>{inst}</li>
              ))}
            </ol>
          </div> : <div>Loading...</div>
      }

    </div>
  )
}

export default ExerciseInfo