import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useError } from "../../contexts/ErrorContext";

function AddExerciseForm(props){
  const { exercise, mode, onSubmit, workoutId} = props
  
  const location = useLocation()
  const { workout } = location.state || {}
  const { workout_id } = useParams()
  const navigate = useNavigate()

  const [workoutType, setWorkoutType] = useState(() => {return workout ? workout.workout_type : ""})
  const [exerciseName, setExerciseName] = useState(exercise?.exercise_name || "")
  const [sets, setSets] = useState(exercise?.sets || 0)
  const [reps, setReps] = useState(exercise?.reps || 0)
  const [weight, setWeight] = useState(exercise?.weight || 0)
  const [distance, setDistance] = useState(exercise?.distance || "")
  const [duration, setDuration] = useState(exercise?.duration || "")
  const [intensity, setIntensity] = useState(exercise?.intensity || "N/A")
  const [exercisesList, setExercisesList] = useState("")
  
  const { errors, setErrors } = useError();

  const strengthTypes = [
    "Strength",
    "Plyometrics",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting"
  ]

  const shouldShowStrengthInputs = strengthTypes.includes(workoutType)

  useEffect(() => {
    async function getExercises(){
      try{
        const response = await fetch(`${API_URL}/exercise_dbs?workout_type=${workoutType}`)
        if (!response.ok) {
          const { errors }= await response.json()
          setErrors(errors)
          return;
        }
        const json = await response.json()
        setExercisesList(json)
      } catch (error) {
        setErrors(['Failed to fetch exercises. Please check your connection or try again later.'])
      }
    }
    getExercises()
  }, [workoutType, props])

  useEffect(()=> {
    if(exercise){
      async function getWorkoutType(){
        try{
          const response = await fetch(`${API_URL}/users/1/workouts/${workoutId}`)
          if (!response.ok) {
            const { errors }= await response.json()
            setErrors(errors)
            return;
          }
          const json = await response.json()
          setWorkoutType(json.workout_type)
        } catch (error) {
          setErrors(['Failed to fetch. Please check your connection or try again later.'])
        }
      }
      getWorkoutType()
    }
  }, [props])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const exerciseData = { 
      exercise_name: exerciseName, 
      sets: Number(sets), 
      reps: Number(reps), 
      weight: Number(weight),
      intensity: intensity,
      distance: Number(distance),
      duration: Number(duration)
    }

    if(mode === "edit"){
      onSubmit(exerciseData)
    } else {
      try{
        const response = await fetch(`${API_URL}/users/1/workouts/${workout_id}/exercises`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exerciseData)
        })

        if (response.ok) {
          navigate(`/users/1/workouts/${workout_id}`)
        } else {
          const { errors } = await response.json()
          setErrors(errors || ['Something went wrong while adding the exercise.'])
        }
      } catch (error) {
        setErrors(['Failed to add exercise. Please check your connection or try again later.'])
      }
    }
  }

  if (!exercisesList) return(<h1>Loading...</h1>)

  return (
    <div>
      <h1>{exercise ? "Update":"Add"} Exercise</h1>
      <h2>{ workoutType }</h2>

      { errors && errors.map((error, index)=> (
        <span key={index}>{error}</span>
      ))}

      <form onSubmit={handleSubmit}>
        <div>
          <label for="exercise-name">Exercise Name</label>
          <select 
            id="exercise-name" 
            value={exerciseName} 
            onChange={(e) => setExerciseName(e.target.value)}
          >
            <option value="">-- Exercise --</option>
            {exercisesList.map((exercise) => (
              <option key={exercise.id} value={exercise.exercise_name}>
                {exercise.exercise_name}
              </option>
            ))}
          </select>
  
        </div>
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
            <div>
              <label for="weight">Weight</label>
              <input id="weight" value={weight} type="text" onChange={(e) => setWeight(e.target.value)}></input>
            </div>
          </div>
        )}

        { workoutType == "Cardio" &&  (
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

        { workoutType == "Stretching" &&  (
          <div>
            <label for="duration">Duration</label>
            <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}></input>
          </div>
        )}

        <div>
          <button type="submit">{exercise ? "Update Exercise":"Add Exercise"}</button>
        </div>
      </form>
      <Link to="/">Back</Link>
    </div>
  )
}

export default AddExerciseForm;
