import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useError } from "../../contexts/ErrorContext";
import { Autocomplete, TextField } from '@mui/material';

function AddExerciseForm(){
  
  const location = useLocation()
  const { workout } = location.state || {}
  const { workout_id } = useParams()
  const navigate = useNavigate()

  const [workoutType, setWorkoutType] = useState(() => {return workout ? workout.workout_type : ""})
  const [exerciseName, setExerciseName] = useState("")
  const [sets, setSets] = useState(0)
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(0)
  const [distance, setDistance] = useState("")
  const [duration, setDuration] = useState("")
  const [intensity, setIntensity] = useState("N/A")
  const [exercisesList, setExercisesList] = useState("")
  
  const { errors, setErrors } = useError();

  const token = localStorage.getItem('token');

  const strengthTypes = [
    "Strength",
    "Plyometrics",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting"
  ]

  const intensityTypes = [
    "Light",
    "Moderate",
    "Vigorous",
  ]

  const shouldShowStrengthInputs = strengthTypes.includes(workoutType)

  useEffect(() => {
    async function getExercises(){
      try{
        const response = await fetch(`${API_URL}/exercise_dbs?workout_type=${workoutType}`,{
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
        setExercisesList(json)
      } catch (error) {
        setErrors(['Failed to fetch exercises. Please check your connection or try again later.'])
      }
    }
    getExercises()
  }, [workoutType])

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

    try{
      const response = await fetch(`${API_URL}/workouts/${workout_id}/exercises`, {
        method: "POST",
        headers: { 
           "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(exerciseData)
      })

      if (response.ok) {
        navigate(`/workouts/${workout_id}`)
      } else {
        const { errors } = await response.json()
        setErrors(errors || ['Something went wrong while adding the exercise.'])
      }
    } catch (error) {
      setErrors(['Failed to add exercise. Please check your connection or try again later.'])
    }
  }

  if (!exercisesList) return(<h1>Loading...</h1>)

  return (
    <div className="bg-neutral-card rounded-md shadow-md p-6 w-full max-w-md mx-auto">
      <h1 className="font-heading text-xl text-white mb-4">Add Exercise</h1>
      <h2 className="font-heading text-md text-white mb-4">Workout Type: { workoutType }</h2>

      { errors && errors.map((error, index)=> (
        <span key={index}>{error}</span>
      ))}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label for="exercise-name" className="block text-white text-sm mb-1 font-sans">Exercise Name</label>
          <Autocomplete
            value={exerciseName} 
            options={exercisesList}
            getOptionLabel={(option) => option.exercise_name || ''}
            renderInput={(params) => (
              <TextField {...params} 
                sx={{
                  input: { color: 'white' },            // Input text
                  label: { color: 'white' },            // Label text
                  '.MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#262A33' }, // Border
                    '&:hover fieldset': { borderColor: '#22C55E' },
                    '&.Mui-focused fieldset': { borderColor: '#22C55E' },
                  },
                  '& .MuiAutocomplete-popupIndicator': {
                    color: 'white',
                  },
                }}
              />
            )}
            className="w-full bg-neutral-hover text-white rounded focus:outline-none focus:ring-2 focus:ring-accent-green"
            onChange={(event, newValue) => setExerciseName(newValue)}
          />
        </div>
        { shouldShowStrengthInputs &&  (
          <div>
            <div>
              <label for="sets" className="block text-white text-sm mb-1 font-sans mt-2">Sets</label>
              <input id="sets" value={sets}  type="text" onChange={(e) => setSets(e.target.value)}
              className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
            </div>
            <div>
              <label for="reps" className="block text-white text-sm mb-1 font-sans mt-2">Reps</label>
              <input id="reps" value={reps} type="text" onChange={(e) => setReps(e.target.value)}
              className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
            </div>
            <div>
              <label for="weight" className="block text-white text-sm mb-1 font-sans mt-2">Weight</label>
              <input id="weight" value={weight} type="text" onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
            </div>
          </div>
        )}

        { workoutType == "Cardio" &&  (
          <div>
            <div>
              <label for="distance" className="block text-white text-sm mb-1 font-sans mt-2">Distance</label>
              <input id="distance" value={distance}  type="text" onChange={(e) => setDistance(e.target.value)}
              className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
            </div>
            <div>
              <label for="exercise-name" className="block text-white text-sm mb-1 font-sans">Intensity</label>
              <Autocomplete
                value={intensity} 
                options={intensityTypes}
                renderInput={(params) => (
                  <TextField {...params} 
                    sx={{
                      input: { color: 'white' },            // Input text
                      label: { color: 'white' },            // Label text
                      '.MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#262A33' }, // Border
                        '&:hover fieldset': { borderColor: '#22C55E' },
                        '&.Mui-focused fieldset': { borderColor: '#22C55E' },
                      },
                      '& .MuiAutocomplete-popupIndicator': {
                        color: 'white',
                      },
                    }}
                  />
                )}
                className="w-full bg-neutral-hover text-white rounded focus:outline-none focus:ring-2 focus:ring-accent-green"
                onChange={(event, newValue) => setIntensity(newValue)}
              />
            </div>
            <div>
              <label for="duration" className="block text-white text-sm mb-1 font-sans mt-2">Duration</label>
              <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
            </div>
          </div>
        )}

        { workoutType == "Stretching" &&  (
          <div>
            <label for="duration" className="block text-white text-sm mb-1 font-sans">Duration</label>
            <input id="duration" value={duration} type="text" onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"></input>
          </div>
        )}

        <div>
          <button type="submit" className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">Add Exercise</button>
        </div>
      </form>
      <Link to="/">Back</Link>
    </div>
  )
}

export default AddExerciseForm;
