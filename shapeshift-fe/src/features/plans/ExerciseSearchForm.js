import React, { useState }from "react";
import { API_URL } from "../../constants/Constants";

function ExerciseSearchForm(props){

  const { setExercisesList } = props
  const [equipment, setEquipment] = useState("")
  const [muscle, setMuscle] = useState("")
  const [mechanic, setMechanic] = useState("")
  const [level, setLevel] = useState("")
  const [display, setDisplay] = useState(false)
  const [nameQuery, setNameQuery] = useState("")
  const [workoutType, setWorkoutType] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState("")

  const token = localStorage.getItem('token')

  const workoutTypeList = [
    "Strength", "Plyometrics", "Strongman", "Powerlifting",
    "Olympic Weightlifting", "Cardio", "Stretching"
  ]

  const equipmentList = [
    "barbell", "dumbbell", "other", "body_only", "cable", 
    "machine", "kettlebells", "bands", "medicine_ball",
    "exercise_ball", "foam_roll", "e-z_curl_bar"
  ]

  const muscleList = [
    "quadriceps","shoulders","abdominals",
    "chest","hamstrings","triceps","biceps",
    "lats","middle_back","forearms","glutes",
    "traps","adductors","abductors","neck"
  ]

  const mechanicList = ["isolation","compound"]
  const levelList = ["beginner","intermediate","expert"]


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
  return(
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit"> {isSubmitting ? "Searching..." : "Search"}</button>
      </form>
    </div>
  )
}

export default ExerciseSearchForm
