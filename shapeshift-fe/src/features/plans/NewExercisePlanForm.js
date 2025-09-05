import React, {useState} from "react"
import { addToExercisePlan } from "../../utils/addToExercisePlan"
import PlanDetails from "./PlanDetails"
import { useNavigate } from "react-router-dom"
import { useError } from "../../contexts/ErrorContext"

function NewExercisePlanForm(props){

  const {exercise, dailyPlanId, planId} = props

  const navigate = useNavigate()
  const {errors, setErrors} = useError()

  const strengthTypes = [
    "strength", "plyometrics", "strongman",
    "powerlifting", "olympic weightlifting"
  ]

  const [shouldShowStrengthInputs, setShouldShowStrengthInputs] = useState(strengthTypes.includes(exercise.category))
  const [isCardio, setIsCardio] = useState(exercise.category === "cardio")
  const [isStretching, setIsStretching] = useState(exercise.category === "stretching")

  const [sets, setSets] = useState("")
  const [reps, setReps] = useState("")
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [intensity, setIntensity] = useState("N/A")

    const handleRepRangeInput = (e) => {
     const value = e.target.value;

    // Only allow numbers and dash (`-`)
    const regex = /^[0-9-]*$/;
    if (regex.test(value)) {
      setReps(value);
    }
  }

  const renderWorkoutInputs = () => {
    if (shouldShowStrengthInputs) {
      return (
        <>
          <label htmlFor="sets" className="block text-white text-sm mb-1 font-sans">Sets</label>
          <input id="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} 
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>

          <label htmlFor="reps" className="block text-white text-sm mb-1 font-sans">Rep Range</label>
          <input id="reps" type="text" value={reps} onChange={(e) => handleRepRangeInput(e)} 
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
        </>
      );
    }

    if (isCardio) {
      return (
        <>
          <label htmlFor="distance" className="block text-white text-sm mb-1 font-sans">Distance</label>
          <input id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} 
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>

          <label htmlFor="intensity" className="block text-white text-sm mb-1 font-sans">Intensity</label>
          <input id="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} 
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>

          <label htmlFor="duration" className="block text-white text-sm mb-1 font-sans">Duration</label>
          <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} 
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
        </>
      );
    }

    if (isStretching) {
      return (
        <>
          <label htmlFor="duration" className="block text-white text-sm mb-1 font-sans">Duration</label>
          <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} 
          className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
        </>
      );
    }

    return null;
  };

  const handleSubmitExercise = async (e) => {
    e.preventDefault()

    const exerciseData = { 
      exercise_name: exercise.exercise_name || exercise.name,
      exercise_id: exercise.exercise_id || exercise.id,
      sets: Number(sets), 
      reps: reps || "--",
      intensity: intensity,
      distance: Number(distance),
      duration: Number(duration)
    }
    console.log(planId)

    const response = await addToExercisePlan(exerciseData, planId, dailyPlanId)

     if (response.success) {
      console.log("ok");
      navigate(`/plans/${planId}`);
    } else {
      setErrors(response.errors);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitExercise} className="space-y-4">
        {renderWorkoutInputs()}
        <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">{"Add"}</button>
      </form>
    </div>
  )
}

export default NewExercisePlanForm