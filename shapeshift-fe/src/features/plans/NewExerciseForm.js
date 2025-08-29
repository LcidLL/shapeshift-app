import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import ExerciseSearchForm from "./ExerciseSearchForm";
import ExerciseInfo from "./ExerciseInfo";

function NewExerciseForm(props){

  const {exercisePlan, mode, onSubmit} = props
  const location = useLocation();

  const { dailyPlanId, planId } = location.state || {};
  
  const [exercisesList, setExercisesList] = useState("")
  const [exerciseName, setExerciseName] = useState(exercisePlan?.exercise_name || "")
  const [exerciseId, setExerciseId] = useState("")
  const [shouldShowStrengthInputs, setShouldShowStrengthInputs] = useState(false)
  const [isCardio, setIsCardio] = useState(false)
  const [isStretching, setIsStretching] = useState(false)
  const [displayExerciseInfo, setDisplayExerciseInfo] = useState(false)
  const [notInDB,setNotInDB] = useState(false)

  const [sets, setSets] = useState(exercisePlan?.sets || "")
  const [reps, setReps] = useState(exercisePlan?.reps || "")
  const [distance, setDistance] = useState(exercisePlan?.distance || "")
  const [duration, setDuration] = useState(exercisePlan?.duration || "")
  const [intensity, setIntensity] = useState(exercisePlan?.intensity || "N/A")
  
  
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()

  const strengthTypes = [
    "strength", "plyometrics", "strongman",
    "powerlifting", "olympic weightlifting"
  ]

  useEffect(() => {
    async function getExercise(){
      if (exercisePlan){
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
          setNotInDB(true)
          console.log("An error occured")
        }
      }
    }
        getExercise()
    }, [exercisePlan])

  const getWorkoutType = async (exercise) => {
    const category = exercise.category
    setShouldShowStrengthInputs(strengthTypes.includes(category))
    setIsCardio(category === "cardio")
    setIsStretching(category === "stretching")
    
    setExerciseName(exercise.name)
    setExerciseId(exercise.id)
  }

  const getExerciseInfo = async (exercise) => {
    setExerciseId(exercise.id)
    setDisplayExerciseInfo(true)
  }

  const handleSubmitExercise = async (e) => {
    e.preventDefault()
    const exerciseData = { 
      exercise_name: exerciseName,
      exercise_id: exerciseId,
      sets: Number(sets), 
      reps: reps, 
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
          console.log("ok")
          const { id } = await response.json();
          navigate(`/users/1/plans/${planId}`);
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors)
        }
      }
  }

  const handleRepRangeInput = (e) => {
     const value = e.target.value;

    // Only allow numbers and dash (`-`)
    const regex = /^[0-9-]*$/;
    if (regex.test(value)) {
      setReps(value);
    }
  }

  const renderWorkoutInputs = () => {
    if (shouldShowStrengthInputs || notInDB) {
      return (
        <>
          <label htmlFor="sets">Sets</label>
          <input id="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} />

          <label htmlFor="reps">Rep Range</label>
          <input id="reps" type="text" value={reps} onChange={(e) => handleRepRangeInput(e)} />
        </>
      );
    }

    if (isCardio) {
      return (
        <>
          <label htmlFor="distance">Distance</label>
          <input id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} />

          <label htmlFor="intensity">Intensity</label>
          <input id="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} />

          <label htmlFor="duration">Duration</label>
          <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </>
      );
    }

    if (isStretching) {
      return (
        <>
          <label htmlFor="duration">Duration</label>
          <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </>
      );
    }

    return null;
  };

  return(
    <div>
      <p>{dailyPlanId}</p> 
      <p>{planId}</p>
      {
        mode !=="edit" && 
        <ExerciseSearchForm setExercisesList={setExercisesList}/>
      }
      {
        exercisesList.length !== 0  && 
        <div>
          {exercisesList.map((exercise) => (
            <div key={exercise.id}>
              <p>{exercise.name}</p>
              { 
                exerciseId === exercise.id && 
                displayExerciseInfo && 
                <ExerciseInfo exerciseId={exercise.id} />
              }

              <span onClick={() => getExerciseInfo(exercise)}>Details</span>
              <button onClick={() => getWorkoutType(exercise)}>Add to Workout</button>

              {(exerciseId === exercise.id) && (
                <form onSubmit={handleSubmitExercise}>
                  {renderWorkoutInputs()}
                  <button type="submit">{exercisePlan ? "Update" : "Add"}</button>
                </form>
              )}
            </div> 
          ))}
        </div>
      }

      {
        mode === "edit" && 
        <form onSubmit={handleSubmitExercise}>
          {renderWorkoutInputs()}
          <button type="submit">{exercisePlan ? "Update" : "Add"}</button>
        </form>
      }
    </div>
  )
}

export default NewExerciseForm;
