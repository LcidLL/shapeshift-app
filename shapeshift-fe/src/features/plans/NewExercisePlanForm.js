import React, {useState} from "react"
import { addToExercisePlan } from "../../utils/addToExercisePlan"
import PlanDetails from "./PlanDetails"
import { useNavigate } from "react-router-dom"
import { useError } from "../../contexts/ErrorContext"
import { X } from "lucide-react"

function NewExercisePlanForm(props){

  const {exercise, dailyPlanId, planId, setIsDisplayed} = props

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
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row justify-center">
            <label htmlFor="sets" className="block text-white text-md font-sans align-center p-2">Sets:</label>
            <input id="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} 
            className="w-1/2 bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
          </div>
          <div className="flex flex-row justify-center">
            <label htmlFor="reps" className="block text-white text-md font-sans align-center p-2">Rep Range:</label>
            <input id="reps" type="text" value={reps} onChange={(e) => handleRepRangeInput(e)} 
            className="w-1/2 bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
          </div>
        </div>
      );
    }

    if (isCardio) {
      return (
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex flex-row justify-center">
            <label htmlFor="distance" className="block text-white text-md font-sans align-center p-2">Distance</label>
            <input id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} 
            className="w-1/2 bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
          </div>
          <div className="flex flex-row justify-center">
            <label htmlFor="intensity" className="block text-white text-md font-sans align-center p-2">Intensity</label>
            <input id="intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} 
            className="w-1/2 bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
          </div>
          <div className="flex flex-row justify-center">
            <label htmlFor="duration" className="block text-white text-md font-sans align-center p-2">Duration</label>
            <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} 
            className="w-1/2 bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
          </div>
        </div>
      );
    }

    if (isStretching) {
      return (
        <div className="flex flex-row justify-center">
          <label htmlFor="duration" className="block text-white text-md font-sans align-center p-2">Duration</label>
          <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} 
          className="w-1/2 bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"/>
        </div>
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="relative bg-neutral-card rounded-2xl shadow-lg p-6 w-full max-w-sm">
        <span onClick={() =>setIsDisplayed(false)} className="absolute top-2 right-2 hover:text-neutral-subtext hover:cursor-pointer">
          <X className="w-4 h-4 text-gray-500 hover:cursor-pointer hover:text-neutral-subtext" />
        </span>
        <p className="font-heading text-md">Input sets and reps for {exercise.exercise_name || exercise.name}.</p>
      <form onSubmit={handleSubmitExercise} className="space-y-4">
        {renderWorkoutInputs()}
        <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">Add to Workout</button>
      </form>
      </div>
    </div>
  )
}

export default NewExercisePlanForm