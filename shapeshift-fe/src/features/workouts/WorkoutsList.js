import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import WorkoutsSummary from "./WorkoutsSummary";
import { useError } from "../../contexts/ErrorContext";
import { MoreHorizontal } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";

function WorkoutsList(){
  
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [forDeleteWorkout, setForDeleteWorkout] = useState({})
  const { errors, setErrors } = useError();
  const token = localStorage.getItem('token');

  const workoutTypeList = [
    "Strength", "Plyometrics", "Strongman",
    "Powerlifting", "Olympic Weightlifting",
    "Cardio", "Stretching"
  ]

  //Get date today and set as maximum in date input
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(today.getDate()).padStart(2, '0')
  const maxDate = `${year}-${month}-${day}`
  
  useEffect(() => {
    // clear error after displaying it once
    return () => setErrors(null);
  }, []);

  useEffect(() => {
    loadWorkouts()
  }, [])

const loadWorkouts = async () => {
  try{
    const response = await fetch(`${API_URL}/workouts`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    if (response.ok) {
      const json = await response.json();
      setErrors([])
      setWorkouts(json);
    } else {
      throw response
    }
  } catch (e) {
    console.log("An error occured")
  }
}

  const handleEdit = (workout) => {
    setOpenMenu(null);
    setEditingRowId(workout.id);
    setEditForm(workout);
    setOpenMenu(null);
  };

   const handleSave = async() => {
    const editedData = { 
      workout_date: editForm.workout_date, 
      workout_type: editForm.workout_type, 
      duration: Number(editForm.duration), 
      calories_burned: Number(editForm.calories_burned)
    }
    try{
      const response = await fetch(`${API_URL}/workouts/${editingRowId}`, {
            method: "PATCH",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(editedData)
          });
      
          if(response.ok){
            setErrors([])
            setEditingRowId(null);
            await loadWorkouts()
          } else {
            const { errors } = await response.json()
            setErrors(errors || ['Failed to edit workout. Please try again.'])
        }
      } catch (error) {
        setErrors(['Failed to edit workout. Please check your connection or try again later.'])
      }
  }

  const handleCancel = () => {
    setEditingRowId(null);
    setEditForm({});
  }

  const handleDelete = (workout) => {
    setOpenMenu(null);
    setForDeleteWorkout(workout)
    setDeleteId(workout.id);
    setOpenDelete(true);
  }

  const deleteWorkout = async () => {
    try {
      const response = await fetch(`${API_URL}/workouts/${deleteId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })

      if(response.ok){
        setErrors([])
        setWorkouts((prev) => prev.filter((workout) => workout.id !== deleteId));
        setOpenDelete(false);
        setDeleteId(null);
        navigate(`/workouts`);
      } else {
        setErrors(['Failed to delete workout. Please try again.'])
      }
    } catch (error) {
      setErrors(['Failed to delete workout. Please check your connection or try again later.'])
    }
  }

  if (!workouts) return(<h1>Loading...</h1>)

  return(
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-card rounded-2xl p-4 text-white text-center">
          <p className="text-sm text-gray-400">Workout Date</p>
          <p className="text-lg font-bold">2025-09-02</p>
        </div>
        <div className="bg-neutral-card rounded-2xl p-4 text-white text-center">
          <p className="text-sm text-gray-400">Type</p>
          <p className="text-lg font-bold">Strength</p>
        </div>
        <div className="bg-neutral-card rounded-2xl p-4 text-white text-center">
          <p className="text-sm text-gray-400">Calories Burned</p>
          <p className="text-lg font-bold">420 kcal</p>
        </div>
        <div className="bg-neutral-card rounded-2xl p-4 text-white text-center">
          <p className="text-sm text-gray-400">Duration</p>
          <p className="text-lg font-bold">45 min</p>
        </div>
      </div>

      <div className="bg-neutral-card rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-accent-green mb-4">Workout History</h2>
          <Link to='/users/1/workouts/new' className="bg-accent-green hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow">
            + Add Workout
          </Link>
        </div>
        { errors && 
          errors.map((error) => (
            <div key={error.id}>
              <h2>{error}</h2>
            </div>
          ))}
        <div className="overflow-x-auto text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-neutral-subtext border-b border-neutral-hover">
                <th className="p-3 font-sans">Workout Date</th>
                <th className="p-3 font-sans">Workout Type</th>
                <th className="p-3 font-sans">Calories Burned (kcal)</th>
                <th className="p-3 font-sans">Duration (mins)</th>
                <th className="p-3 font-sans">No. of Exercises Done</th>
                <th className="p-3 font-sans"></th>
              </tr>
            </thead>
            <tbody>
              { workouts.map((workout) => (
                <>
                <tr 
                  key={workout.id} 
                  onClick={editingRowId === null ? () => navigate(`/workouts/${workout.id}`) : undefined} 
                  className="cursor-pointer hover:bg-neutral-hover transition-colors"
                >
                  {editingRowId === workout.id ? (
                    <>
                      {/* Editable cells */}
                      <td className="p-3">
                        <input
                          type="date"
                          max={maxDate} 
                          value={editForm.workout_date}
                          onChange={(e) =>
                            setEditForm({ ...editForm, workout_date: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                          required
                        />
                      </td>
                      <td className="p-3">
                        <select
                          value={editForm.workout_type}
                          onChange={(e) =>
                            setEditForm({ ...editForm, workout_type: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                          required
                        >
                          { workoutTypeList.map((type,index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          value={editForm.calories_burned}
                          onChange={(e) =>
                            setEditForm({ ...editForm, calories_burned: e.target.value })
                          }
                          className="w-full bg-neutral-hover text-white rounded px-2 py-1"
                          required
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
                          required
                        />
                      </td>
                      <td className="p-3 font-sans text-neutral-text">{workout.exercises_count}</td>
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
                      <td className="p-3 font-mono text-neutral-text">{workout.workout_date}</td>
                      <td className="p-3 font-sans text-neutral-text">{workout.workout_type}</td>
                      <td className="p-3 font-mono text-accent-green">{workout.calories_burned}</td>
                      <td className="p-3 font-sans text-neutral-text">{workout.duration}</td>
                      <td className="p-3 font-sans text-neutral-text">{workout.exercises_count}</td>

                      <td
                        className="p-3 relative text-center"
                        onClick={(e) => e.stopPropagation()} // prevent row click
                      >
                        <div className="relative group inline-block">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === workout.id ? null : workout.id)
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

                        {openMenu === workout.id && (
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
                              onClick={() => handleEdit(workout)}
                              className="block w-full text-left px-4 py-2 text-white hover:bg-neutral-hover font-sans"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(workout)}
                              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-neutral-hover font-sans"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </>
                    )
                  }
                </tr>
                </>
              ))}
            </tbody>
          </table>
          <ConfirmationModal
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            onConfirm={deleteWorkout}
            workout = {forDeleteWorkout}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkoutsList;
