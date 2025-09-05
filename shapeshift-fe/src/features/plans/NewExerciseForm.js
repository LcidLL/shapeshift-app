import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import ExerciseSearchForm from "./ExerciseSearchForm";
import ExerciseInfo from "./ExerciseInfo";
import NewExercisePlanForm from "./NewExercisePlanForm";

function NewExerciseForm(props){

  const {exercisePlan, mode, onSubmit} = props
  const location = useLocation();

  const { dailyPlanId, planId } = location.state || {};
  console.log(planId)
  
  const [exercisesList, setExercisesList] = useState("")
  const [exerciseName, setExerciseName] = useState(exercisePlan?.exercise_name || "")
  const [exerciseId, setExerciseId] = useState("")
  const [shouldShowStrengthInputs, setShouldShowStrengthInputs] = useState(false)
  const [isCardio, setIsCardio] = useState(false)
  const [isStretching, setIsStretching] = useState(false)
  const [displayExerciseInfo, setDisplayExerciseInfo] = useState(false)
  const [notInDB,setNotInDB] = useState(false)

  const [sets, setSets] = useState(exercisePlan?.sets || "")
  const [reps, setReps] = useState(exercisePlan?.reps || "N/A")
  const [distance, setDistance] = useState(exercisePlan?.distance || "")
  const [duration, setDuration] = useState(exercisePlan?.duration || "")
  const [intensity, setIntensity] = useState(exercisePlan?.intensity || "N/A")
  const [exerciseNamesList, setExerciseNamesList] = useState("")
  const [exerciseInfo, setExerciseInfo] = useState("")
  
  
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()

  const token = localStorage.getItem('token');

  const strengthTypes = [
    "strength", "plyometrics", "strongman",
    "powerlifting", "olympic weightlifting"
  ]

  useEffect(() => {
        async function getExercisesNames(){
          try{
            const response = await fetch(`${API_URL}/exercise_dbs`,{
              headers: {
                 "Authorization": `Bearer ${token}`,
              }
            })
            if (!response.ok) {
              const { errors }= await response.json()
              setErrors(errors)
              return;
            }
            const json = await response.json()
            console.log(json.all)
            setExerciseNamesList(json.all)
          } catch (error) {
            setErrors(['Failed to fetch exercises. Please check your connection or try again later.'])
          }
        }
        getExercisesNames()
      }, [])

  useEffect(() => {
    async function getExercise(){
      if (exercisePlan){
        try{
          const response = await fetch(`${API_URL}/exercise_dbs?exercise_name=${exercisePlan.exercise_name}`,{
            headers: {
              "Authorization": `Bearer ${token}`,
            }
          });
          if (response.ok) {
            const json = await response.json();
            setShouldShowStrengthInputs(strengthTypes.includes(json.data[0].category))
            setIsCardio(json.data[0].category === "cardio")
            setIsStretching(json.data[0].category === "stretching")
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
        const response = await fetch(`${API_URL}/plans/${planId}/daily_plans/${dailyPlanId}/exercise_plans`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(exerciseData)
        });
    
        if(response.ok){
          console.log("ok")
          const { id } = await response.json();
          navigate(`/plans/${planId}`);
        } else {
          const errorData = await response.json();
          setErrors(errorData.errors)
        }
      }
  }

  // const handleRepRangeInput = (e) => {
  //    const value = e.target.value;

  //   // Only allow numbers and dash (`-`)
  //   const regex = /^[0-9-]*$/;
  //   if (regex.test(value)) {
  //     setReps(value);
  //   }
  // }

  // const renderWorkoutInputs = () => {
  //   if (shouldShowStrengthInputs || notInDB) {
  //     return (
  //       <>
  //         <label htmlFor="sets" className="block text-white text-sm mb-1 font-sans">Sets</label>
  //         <input id="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} 
  //         className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>

  //         <label htmlFor="reps" className="block text-white text-sm mb-1 font-sans">Rep Range</label>
  //         <input id="reps" type="text" value={reps} onChange={(e) => handleRepRangeInput(e)} 
  //         className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
  //       </>
  //     );
  //   }

  //   if (isCardio) {
  //     return (
  //       <>
  //         <label htmlFor="distance" className="block text-white text-sm mb-1 font-sans">Distance</label>
  //         <input id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} 
  //         className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>

  //         <label htmlFor="intensity" className="block text-white text-sm mb-1 font-sans">Intensity</label>
  //         <input id="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} 
  //         className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>

  //         <label htmlFor="duration" className="block text-white text-sm mb-1 font-sans">Duration</label>
  //         <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} 
  //         className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
  //       </>
  //     );
  //   }

  //   if (isStretching) {
  //     return (
  //       <>
  //         <label htmlFor="duration" className="block text-white text-sm mb-1 font-sans">Duration</label>
  //         <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} 
  //         className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
  //       </>
  //     );
  //   }

  //   return null;
  // };
console.log(exercisesList)
  return(
    <div className="">
      { exercisesList.length === 0 &&
        mode !=="edit" && 
        <ExerciseSearchForm exerciseNamesList={exerciseNamesList} setExerciseInfo={setExerciseInfo} dailyPlanId={dailyPlanId} planId={planId}/>
      }
      {
        exercisesList.length !== 0  && 
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 overflow-y-scroll mx-auto my-4 p-2">
          {exercisesList.map((exercise, index) => (
            <div
              key={index}
              className="p-2 border rounded shadow hover:bg-neutral-hover transition hover:cursor-pointer"
            >
              <Link to="/exercise-info" state={{exerciseInfo: exercise, dailyPlanId: dailyPlanId, planId: planId}} 
              className="text-sm font-semibold">
            {exercise.name}
            </Link>
            </div>
          ))}
        </div>
            // <div key={exercise.id}>
            // <Link to="/exercise-info" state={{exerciseInfo: exercise, dailyPlanId: dailyPlanId, planId: planId}}>
            //   <p>{exercise.name}</p>
            // </Link>
            // </div>  ))}
        // }
        // </div>
      }

      {/* {
        mode === "edit" && 
        <form onSubmit={handleSubmitExercise} className="space-y-4">
          {renderWorkoutInputs()}
          <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">{exercisePlan ? "Update" : "Add"}</button>
        </form>
      } */}
    </div>
  )
}

export default NewExerciseForm;
