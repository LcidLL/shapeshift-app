import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { API_URL } from "../../constants/Constants";
import AddExerciseForm from "./AddExerciseForm";
import { MoreHorizontal } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";

function ExercisesList(props){
  const { workout } = props

  const { id } = useParams();
  const navigate = useNavigate();

  const [ exercises, setExercises ] = useState([])
  const [errors, setErrors] = useState("")
  const [openMenu, setOpenMenu] = useState(false)
  const [editingRowId, setEditingRowId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [forDeleteExercsie, setForDeleteExercise] = useState({})

  const token = localStorage.getItem('token');

  const workoutType = workout?.workout_type

  const strengthTypes = [
    "Strength",
    "Plyometrics",
    "Strongman",
    "Powerlifting",
    "Olympic Weightlifting"
  ]

  const shouldShowStrengthInputs = strengthTypes.includes(workoutType)
  
  useEffect (() => {
    async function getExercises(){
      try {
        const response = await fetch(`${API_URL}/workouts/${id}/exercises`,{
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        })
        if (response.ok) {
          const json = await response.json()
          setExercises(json)
        } else {
          const { errors } = await response.json()
          setErrors(errors || ['Failed to fetch exercises. Please try again.'])
          navigate(`/workouts`)
        }
      } catch (error) {
        setErrors(['Failed to fetch exercises. Please check your connection or try again later.'])
      }
    }
    getExercises();
  }, [id, editingRowId])

  const deleteExercise = async () => {
    try{
      const response = await fetch(`${API_URL}/workouts/${id}/exercises/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })

      if(response.ok){
        setExercises((prev) => prev.filter((ex) => ex.id !== deleteId))
        setOpenDelete(false)
        setDeleteId(null)
        setForDeleteExercise({})
        navigate(`/workouts/${id}`)
      } else {
        const { errors } = await response.json()
        console.log(errors)
        setErrors(errors || ['Something went wrong while deleting the exercise.'])
      }
    } catch (error){
      setErrors(['Failed to delete exercise. Please check your connection or try again later.'])
    }
  }

  const handleSave = async () => {
    console.log(editForm)
    const editedData = { 
      exercise_name: editForm.exercise_name, 
      sets: Number(editForm.sets), 
      reps: Number(editForm.reps), 
      weight: Number(editForm.weight),
      intensity: editForm.intensity,
      distance: Number(editForm.distance),
      duration: Number(editForm.duration)
    }

    try{
      const response = await fetch(`${API_URL}/workouts/${id}/exercises/${editingRowId}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedData)
      })
      
      if(response.ok){
        setEditingRowId(null)
        setEditForm({});
        navigate(`/workouts/${id}`)
      } else {
        const { errors } = await response.json();
        setErrors(errors || ['Something went wrong while updating exercise.']);
      }
    } catch (error){
      setErrors(['Failed to Update exercise. Please check your connection or try again later.'])
    }
  }

  const handleDelete = (exercise) => {
    setOpenMenu(null);
    setForDeleteExercise(exercise)
    setDeleteId(exercise.id);
    setOpenDelete(true);
  }

  const handleEdit = (exercise) => {
    setOpenMenu(null);
    setEditingRowId(exercise.id);
    setEditForm(exercise);
    setOpenMenu(null);
  }

  const handleCancel = () => {
    setEditingRowId(null);
    setEditForm({});
  }

  if (!exercises) return(<h1>Loading...</h1>)

  return(
    <div>
      <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-2xl text-white flex items-center gap-3">Exercises
            
          </h2>
          <Link to={`/workouts/${id}/exercises/new`} className="flex gap-1 text-sm font-sans text-neutral-subtext" state={{workout}}> 
              + Add Exercise
            </Link>
      </div>
      { errors && 
        errors.map((error) => (
          <div key={error.id}>
            <h2>{error}</h2>
          </div>
        )) }

         <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-neutral-subtext border-b border-neutral-hover">
                <th className="p-3 font-sans">Name</th>

                {shouldShowStrengthInputs && (
                  <>
                    <th className="p-3 font-sans">Sets</th>
                    <th className="p-3 font-sans">Reps</th>
                    <th className="p-3 font-sans">Weight (lbs)</th>
                  </>
                )}

                {workoutType === "Cardio" && (
                  <>
                    <th className="p-3 font-sans">Distance</th>
                    <th className="p-3 font-sans">Intensity</th>
                    <th className="p-3 font-sans">Duration</th>
                  </>
                )}

                {workoutType === "Stretching" && (
                  <>
                    <th className="p-3 font-sans">Duration</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              { exercises.map((exercise,index) => (

                <tr
                  key={index}
                  className="hover:bg-neutral-hover transition-colors text-white"
                >
                <td className="p-3">{exercise.exercise_name}</td>
                {editingRowId === exercise.id ? (
                    <>
                      {/* Editable cells */}
                       {shouldShowStrengthInputs &&(<>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.sets}
                          onChange={(e) =>
                            setEditForm({ ...editForm, sets: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td>

                       <td className="p-3">
                        <input
                          type="text"
                          value={editForm.reps}
                          onChange={(e) =>
                            setEditForm({ ...editForm, reps: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.weight}
                          onChange={(e) =>
                            setEditForm({ ...editForm, weight: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td>
                      </>)}
                      

                      {workoutType === "Cardio" && (<>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.distance}
                          onChange={(e) =>
                            setEditForm({ ...editForm, distance: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td>

                       <td className="p-3">
                        <input
                          type="text"
                          value={editForm.intensity}
                          onChange={(e) =>
                            setEditForm({ ...editForm, intensity: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.duration}
                          onChange={(e) =>
                            setEditForm({ ...editForm, duration: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td></>)}

                      {workoutType === "Stretching" && (<>
                      <td className="p-3">
                        <input
                          type="text"
                          value={editForm.duration}
                          onChange={(e) =>
                            setEditForm({ ...editForm, duration: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                        />
                      </td></>)}
        

                      <td className="p-3 flex gap-2">
                        <button
                          onClick={handleSave}
                          className="bg-accent-green hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                    ) : (
                    <>
                
                {shouldShowStrengthInputs && (
                    <>
                      <td className="p-3">{exercise.sets}</td>
                      <td className="p-3">{exercise.reps}</td>
                      <td className="p-3">{exercise.weight}</td>
                    </>
                  )}

                  {workoutType === "Cardio" && (
                    <>
                      <td className="p-3">{exercise.distance}</td>
                      <td className="p-3">{exercise.intensity}</td>
                      <td className="p-3">{exercise.duration}</td>
                    </>
                  )}

                   {workoutType === "Stretching" && (
                    <>
                      <td className="p-3">{exercise.duration}</td>
                    </>
                  )}
                  <td
                        className="p-3 relative text-center"
                      >
                        <div className="relative group inline-block">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === exercise.id ? null : exercise.id)
                            }
                            className="p-2 rounded-full hover:bg-neutral-hover"
                          >
                            <MoreHorizontal className="w-5 h-5 text-white" />
                          </button>

                          {/* Tooltip */}
                          <div className="absolute bottom-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
                            More actions
                          </div>
                        </div>

                        {openMenu === exercise.id && (
                          <div className="absolute right-6 top-10 bg-neutral-card border border-neutral-hover rounded-lg shadow-lg w-40 z-10">
                            <button
                              onClick={() => {
                                setOpenMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-hover font-sans"
                            >
                              Add Exercise
                            </button>
                            <button
                              onClick={() => handleEdit(exercise)}
                              className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-hover font-sans"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(exercise)}
                              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-neutral-hover font-sans"
                            >
                              Delete
                            </button>
                          </div>
                        )}</td>
                    </>)}
                 </tr>
              )) }
              </tbody>
        </table>
        <ConfirmationModal
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={deleteExercise}
            exercise = {forDeleteExercsie}
          />
      </div>
    </div>
  )
}

export default ExercisesList;
