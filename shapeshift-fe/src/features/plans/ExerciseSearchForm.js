import React, { useState, useEffect }from "react";
import { API_URL } from "../../constants/Constants";
import { Autocomplete, TextField } from '@mui/material';
import { Navigate, useNavigate, Link} from "react-router-dom";

function ExerciseSearchForm(props){

  const { exerciseNamesList, dailyPlanId, planId } = props
  const [exercisesList, setExercisesList] = useState()
  const [equipment, setEquipment] = useState("")
  const [exerciseName, setExerciseName] = useState("")
  const [muscle, setMuscle] = useState("")
  const [mechanic, setMechanic] = useState("")
  const [level, setLevel] = useState("")
  const [display, setDisplay] = useState(false)
  const [nameQuery, setNameQuery] = useState("")
  const [workoutType, setWorkoutType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState("")
  const [isDisplayed, setIsDisplayed] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const workoutTypeList = [
    "Strength", "Plyometrics", "Strongman", "Powerlifting",
    "Olympic Weightlifting", "Cardio", "Stretching"
  ]

  const equipmentList = [
    "Barbell", "Dumbbell", "Other", "Body only", "Cable", 
    "Machine", "Kettlebells", "Bands", "Medicine ball",
    "Exercise ball", "Foam roll", "E-z curl bar"
  ]

  const muscleList = [
    "Quadriceps","Shoulders","Abdominals",
    "Chest","Hamstrings","Triceps","Biceps",
    "Lats","Middle back","Forearms","Glutes",
    "Traps","Adductors","Abductors","Neck"
  ]

  const mechanicList = ["Isolation","Compound"]
  const levelList = ["Beginner","Intermediate","Expert"]

  const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true); // Start loading
      setDisplay(false)
  
      try {
        const response = await fetch(`${API_URL}/search?name=${nameQuery}&workout_type=${workoutType}&mechanic=${mechanic}&muscle=${muscle}&equipment=${equipment}&level=${level}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });
        if (response.ok) {
            const json = await response.json();
            setExercisesList(json);
            console.log(json)
            // setIsDisplayed(false)
          } else {
            const { errors } = await response.json();
            setErrors(errors);
          }
      } catch (error) {
        console.error("Submission error", error);
        setErrors(["Something went wrong."]);
      } finally {
        setIsSubmitting(false); // Stop loading
      }
    }

    const handleSubmitExercise = async (e) => {
      e.preventDefault()
      navigate('/exercise-info', { state: { exercise: exerciseName, dailyPlanId: dailyPlanId, planId: planId} })
  
    // try {
    //         const response = await fetch(`${API_URL}/get_info?exercise_id=${exerciseName.exercise_id}`, {
    //           headers: {
    //             "Authorization": `Bearer ${token}`,
    //           }
    //         });
    //         if (response.ok) {
    //             const json = await response.json();
    //             setExerciseInfo(json)
    //           } else {
    //             throw response
    //           }
    //       } catch (e) {
    //         console.log("An error occured")
    //       }
    }
  return(
    <div className="flex flex-col items-center justify-between w-full">
      <h2 className="font-heading text-xl text-white mb-4">Exercise Search</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col justify-around">
          <div className="row-span-1">
            <div className="relative bg-neutral-card rounded-2xl shadow-lg p-6 w-full max-w-lg mx-auto">
              <form onSubmit={handleSubmitExercise} className="flex flex-col mx-auto w-full">
                <label for="workout-type" className="block text-white text-md mb-3 font-sans mt-2">Search by Exercise Name</label>
                <Autocomplete
                  value={exerciseName} 
                  options={exerciseNamesList}
                  getOptionLabel={(option) => option.exercise_name || ''}
                  renderInput={(params) => (
                    <TextField {...params} 
                      sx={{
                        input: { color: 'white' },            // Input text
                        label: { color: 'gray' },            // Label text
                        '.MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#262A33' }, // Border
                          '&:hover fieldset': { borderColor: '#22C55E' },
                          '&.Mui-focused fieldset': { borderColor: '#22C55E' },
                        },
                        '& .MuiAutocomplete-popupIndicator': {
                          color: 'white',
                        },
                      }}
                      label="Exercise name"
                    />
                  )}
                  className="w-full bg-neutral-hover text-white rounded focus:outline-none focus:ring-2 focus:ring-accent-green"
                  onChange={(event, newValue) => setExerciseName(newValue)}
                />
                <button 
                  type="submit" 
                  className="w-full mt-4 bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow"> 
                  {isSubmitting ? "Searching..." : "Search"}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-neutral-card rounded-2xl shadow-lg p-4">
              <h2 className="block text-white text-md mb-3 font-sans mt-2">Search by Filter</h2>
              <form onSubmit={handleSubmit}>
                <div className="relative bg-neutral-card rounded-2xl shadow-lg p-2 grid grid-cols-2">
                  <div>
                    <label for="workout-type" className="block text-white text-sm mb-1 font-sans mt-2">Workout Type</label>
                    <select id="workout-type" value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} 
                    className={`w-3/4 bg-neutral-hover rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green 
                      ${workoutType === "" ? 'text-gray-500' : 'text-white'}`
                    }>
                      <option value="">-- Optional --</option>
                      { workoutTypeList.map((type) => (
                        <option key={type} value={type} className="text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label for="muscle-list" className="block text-white text-sm mb-1 font-sans mt-2">Muscle</label>
                    <select placeholder="Optional" id="muscle-list" value={muscle} onChange={(e) => setMuscle(e.target.value)} 
                    className={`w-3/4 bg-neutral-hover rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green 
                      ${muscle === "" ? 'text-gray-500' : 'text-white'}`
                    }>
                      <option value="">-- Optional --</option>
                      { muscleList.map((type) => (
                        <option key={type} value={type} className="text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label for="equipment-list" className="block text-white text-sm mb-1 font-sans mt-2">Equipment</label>
                    <select id="equipment-list" value={equipment} onChange={(e) => setEquipment(e.target.value)} 
                    className={`w-3/4 bg-neutral-hover rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green 
                      ${equipment === "" ? 'text-gray-500' : 'text-white'}`
                    }>
                      <option value="">-- Optional --</option>
                      { equipmentList.map((type) => (
                        <option key={type} value={type} className="text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label for="mechanic-list" className="block text-white text-sm mb-1 font-sans mt-2">Mechanic</label>
                    <select id="mechanic-list" value={mechanic} onChange={(e) => setMechanic(e.target.value)} 
                    className={`w-3/4 bg-neutral-hover rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green 
                      ${mechanic === "" ? 'text-gray-500' : 'text-white'}`
                    }>
                      <option value="">-- Optional --</option>
                      { mechanicList.map((type) => (
                        <option key={type} value={type} className="text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label for="level-list" className="block text-white text-sm mb-1 font-sans mt-2">Level</label>
                    <select id="level-list" value={level} onChange={(e) => setLevel(e.target.value)} 
                    className={`w-3/4 bg-neutral-hover rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green 
                    ${level === "" ? 'text-gray-500' : 'text-white'}`
                    }>
                      <option value="">-- Optional --</option>
                      { levelList.map((type) => (
                        <option key={type} value={type} className="text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-3/4 h-[40px] mt-4 bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow mx-auto"> 
                    {isSubmitting ? "Searching..." : "Search"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="relative bg-neutral-card rounded-2xl shadow-lg p-2 h-4/5 h-[550px]"> 
          {
            exercisesList  &&<>
            <h1>Filter Results</h1>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-scroll mx-auto my-4 p-2 max-h-[550px]">
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
            </>
          }
          </div>
          </div>
    </div>
  )
}

export default ExerciseSearchForm
