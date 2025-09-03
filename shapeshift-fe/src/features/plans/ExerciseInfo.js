import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";

function ExerciseInfo(props){

  const { exerciseId } = props
  const [exerciseInfo, setExerciseInfo] = useState("")
  const token = localStorage.getItem('token')

  useEffect(() => {
     async function getExerciseInfo(){
      try {
        const response = await fetch(`${API_URL}/get_info?exercise_id=${exerciseId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
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