import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AddExerciseForm(props){
  const { exercise, mode, onSubmit, workoutId} = props
  const location = useLocation();
  const { workout } = location.state || {};
  const { workout_id } = useParams();

  const [workoutType, setWorkoutType] = useState(() => {
  return workout ? workout.workout_type : "";
});
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("N/A");
  const [exercisesList, setExercisesList] = useState([])
  const navigate = useNavigate();

  const strengthTypes = [
    "Strength",
    "Plyometrics",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting"
  ];

  const shouldShowStrengthInputs = strengthTypes.includes(workoutType);

  useEffect(() => {
    async function getExercises(){
      try{
        const response = await fetch(`${API_URL}/exercise_dbs?workout_type=${workoutType}`);
        if (response.ok) {
          const json = await response.json();
          setExercisesList(json)
        } else {
          throw response
        }
      } catch (e) {
        console.log("An error occured")
      }
    }
      getExercises()
  }, [workoutType, props])

  useEffect(()=> {
    if(exercise){
      setExerciseName(exercise.exercise_name);
      setSets(exercise.sets);
      setReps(exercise.reps);
      setWeight(exercise.weight);
      setDistance(exercise.distance);
      setDuration(exercise.duration);
      setIntensity(exercise.intensity);

      async function getWorkoutType(){
        try{
          const response = await fetch(`${API_URL}/users/1/workouts/${workoutId}`);
          if (response.ok) {
            const json = await response.json();
            setWorkoutType(json.workout_type);
          } else {
            throw response
          }
        } catch (e) {
          console.log("An error occured")
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
      const response = await fetch(`${API_URL}/users/1/workouts/${workout_id}/exercises`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseData)
      });

      if(response.ok){
        const { id } = await response.json();
        navigate(`/users/1/workouts/${workout_id}`);
      } else {
        console.log("Error occured")
      }
    }
  }

  return (
    <div>
      <h1>{exercise ? "Update":"Add"} Exercise</h1>
      <h2>{ workoutType }</h2>
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
