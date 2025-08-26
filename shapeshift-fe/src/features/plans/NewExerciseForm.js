import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/Constants";

function NewExerciseForm(props){

  const {exercisePlan, mode, onSubmit} = props
  const location = useLocation();
  const { dailyPlanId, planId } = location.state || {};
  const [exercisesList, setExercisesList] = useState("")
  const [exerciseName, setExerciseName] = useState(exercisePlan?.exercise_name || "")
  const [exerciseId, setExerciseId] = useState("")
  const [workoutType, setWorkoutType] = useState("")
  const [shouldShowStrengthInputs, setShouldShowStrengthInputs] = useState(false)
  const [isCardio, setIsCardio] = useState(false)
  const [isStretching, setIsStretching] = useState(false)
  const [equipment, setEquipment] = useState("")
  const [muscle, setMuscle] = useState("")
  const [mechanic, setMechanic] = useState("")
  const [level, setLevel] = useState("")
  const [display, setDisplay] = useState(false)
  const [sets, setSets] = useState(exercisePlan?.sets || "")
  const [reps, setReps] = useState(exercisePlan?.reps || "")
  const [distance, setDistance] = useState(exercisePlan?.distance || "")
  const [duration, setDuration] = useState(exercisePlan?.duration || "")
  const [intensity, setIntensity] = useState(exercisePlan?.intensity || "N/A")
  const [nameQuery, setNameQuery] = useState("");
  const [exerciseInfo, setExerciseInfo] = useState("")
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()

  const workoutTypeList = [
    "Strength",
    "Plyometrics",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting",
    "Cardio",
    "Stretching"
  ];

  const strengthTypes = [
    "strength",
    "plyometrics",
    "strongman",
    "powerlifting",
    "olympic weightlifting"
  ];

  const equipmentList = [
    "barbell",
    "dumbbell",
    "other",
    "body_only",
    "cable",
    "machine",
    "kettlebells",
    "bands",
    "medicine_ball",
    "exercise_ball",
    "foam_roll",
    "e-z_curl_bar"
  ]

  const mechanicList = ["isolation","compound"]
  const muscleList = ["quadriceps","shoulders","abdominals","chest","hamstrings","triceps","biceps","lats","middle_back","forearms","glutes","traps","adductors","abductors","neck"]
  const levelList = ["beginner","intermediate","expert"]

  useEffect(() => {
      async function getExercise(){
        try{
          const response = await fetch(`${API_URL}/exercise_dbs?exercise_name=${exercisePlan.exercise_name}`);
          if (response.ok) {
            const json = await response.json();
            setShouldShowStrengthInputs(strengthTypes.includes(json[0].category))
            setIsCardio(json[0].category === "cardio")
            setIsStretching(json[0].category === "stretching")
          } else {
            throw response
          }
        } catch (e) {
          console.log("An error occured")
        }
      }
        getExercise()
    }, [exercisePlan])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setDisplay(false)

    try {
      const response = await fetch(`${API_URL}/users/1/search?name=${nameQuery}&workout_type=${workoutType}&mechanic=${mechanic}&muscle=${muscle}&equipment=${equipment}&level=${level}`);
      if (response.ok) {
          const json = await response.json();
          setExercisesList(json);
          console.log(json)
        } else {
          throw response
        }
    } catch (e) {
      console.log("An error occured")
    }
  }
  const getExercise = async (exercise_id) => {
    try {
      const response = await fetch(`${API_URL}/users/1/get_info?exercise_id=${exercise_id}`);
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

  const setWorkout = async (exercise) => {
    const strengthTypes = [
      "strength",
      "plyometrics",
      "strongman",
      "powerlifting",
      "olympic Weightlifting"
    ];
    const category = exercise.category
    setShouldShowStrengthInputs(strengthTypes.includes(category))
    setIsCardio(category === "cardio")
    setIsStretching(category === "stretching")
    
    setExerciseName(exercise.name)
    setExerciseId(exercise.id)
  }


  const handleSubmitExercise = async (e) => {
    e.preventDefault()
    const exerciseData = { 
      exercise_name: exerciseName,
      exercise_id: exerciseId,
      sets: Number(sets), 
      reps: Number(reps), 
      intensity: intensity,
      distance: Number(distance),
      duration: Number(duration)
    }
    if (mode === "edit"){
      onSubmit(exerciseData)
    }else{
    
        const response = await fetch(`${API_URL}/users/1/plans/${planId}/daily_plans/${dailyPlanId}/exercise_plans`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(exerciseData)
        });
    
        if(response.ok){
          const { id } = await response.json();
          navigate(`/users/1/plans/${planId}`);
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors)
        }
      }
  }

  return(
    <div>
     <p>{dailyPlanId}</p> 
      <p>{planId}</p>
      {mode !=="edit" && <><form onSubmit={handleSubmit}>
        <div>
        <label for="workout-type">Exercise Name</label>
        <input
        type="text"
        placeholder="Search exercises..."
        value={nameQuery}
        onChange={(e) => setNameQuery(e.target.value)}
      />
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
          <label for="muscle-list">Muscle</label>
          <select id="muscle-list" value={muscle} onChange={(e) => setMuscle(e.target.value)}>
            <option value="">Optional</option>
            { muscleList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label for="equipment-list">Equipment</label>
          <select id="equipment-list" value={equipment} onChange={(e) => setEquipment(e.target.value)}>
            <option value="">Optional</option>
            { equipmentList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label for="mechanic-list">Mechanic</label>
          <select id="mechanic-list" value={mechanic} onChange={(e) => setMechanic(e.target.value)}>
            <option value="">Optional</option>
            { mechanicList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

         <div>
          <label for="level-list">Level</label>
          <select id="level-list" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">Optional</option>
            { levelList.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Search</button>
      </form>

      {exercisesList.length != 0  ? 
        <div>
          {exercisesList.map((exercise) => (
            <div key={exercise.id} onClick={() => getExercise(exercise.id)}>
              <p>{exercise.name}</p>
              <span onClick={() => getExercise(exercise.id)}>Details</span>
              { 
                exerciseInfo ? 
                  <div>
                    {<img src={exerciseInfo.images[1]} />}
                    <ol>
                    {exerciseInfo.instructions.map((inst, index) => (
                      <li key={index}>{inst}</li>
                    ))}
                  </ol>
                  
                  </div> : <div>N/A</div>
              }
              <button onClick={() => setWorkout(exercise)}>Add to Workout</button>
              { exerciseId === exercise.id && (
                <form onSubmit={handleSubmitExercise}>
                  { shouldShowStrengthInputs &&  (
                    <div>
                      <div>
                        <label for="sets">Sets</label>
                        <input id="sets" value={sets}  type="text" onChange={(e) => setSets(e.target.value)}></input>
                      </div>
                      <div>
                        <label for="reps">Reps</label>
                        <input id="reps" value={reps} type="text" onChange={(e) => setReps(e.target.value)}></input>
                      </div>
                    </div>
                  )}

                  { isCardio &&  (
                    <div>
                      <div>
                        <label for="distance">Distance</label>
                        <input id="distance" value={distance}  type="text" onChange={(e) => setDistance(e.target.value)}></input>
                      </div>
                      <div>
                        <label for="intensity">Intensity</label>
                        <input id="intensity" value={intensity} type="text" onChange={(e) => setIntensity(e.target.value)}></input>
                      </div>
                      <div>
                        <label for="duration">Duration</label>
                        <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}></input>
                      </div>
                    </div>
                  )}

                  { isStretching &&  (
                    <div>
                      <label for="duration">Duration</label>
                      <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}></input>
                    </div>
                  )}

                  <button type="submit">Add</button>
                  </form>
              )}
            </div>
          ))}
        </div> : <h1>No Exercise</h1>}</>}

        {mode === "edit" && <form onSubmit={handleSubmitExercise}>
                  { shouldShowStrengthInputs &&  (
                    <div>
                      <div>
                        <label for="sets">Sets</label>
                        <input id="sets" value={sets}  type="text" onChange={(e) => setSets(e.target.value)}></input>
                      </div>
                      <div>
                        <label for="reps">Reps</label>
                        <input id="reps" value={reps} type="text" onChange={(e) => setReps(e.target.value)}></input>
                      </div>
                    </div>
                  )}

                  { isCardio &&  (
                    <div>
                      <div>
                        <label for="distance">Distance</label>
                        <input id="distance" value={distance}  type="text" onChange={(e) => setDistance(e.target.value)}></input>
                      </div>
                      <div>
                        <label for="intensity">Intensity</label>
                        <input id="intensity" value={intensity} type="text" onChange={(e) => setIntensity(e.target.value)}></input>
                      </div>
                      <div>
                        <label for="duration">Duration</label>
                        <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}></input>
                      </div>
                    </div>
                  )}

                  { isStretching &&  (
                    <div>
                      <label for="duration">Duration</label>
                      <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}></input>
                    </div>
                  )}

                  <button type="submit">{exercisePlan ? "Update":"Add"}</button>
                  </form>}
    </div>
  )
}

export default NewExerciseForm;
