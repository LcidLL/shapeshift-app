import React, { useEffect, useState } from "react";
import { API_URL } from "../../constants/Constants";
import { Link, useNavigate } from "react-router-dom";
import WorkoutsSummary from "./WorkoutsSummary";
import { useError } from "../../contexts/ErrorContext";
import { Bold, MoreHorizontal } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useAuth } from "../../contexts/AuthContext";
import { Box } from "@mui/material";
import { PieChart, pieArcClasses, pieArcLabelClasses} from "@mui/x-charts/PieChart";

function WorkoutsList(){
  
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [forDeleteWorkout, setForDeleteWorkout] = useState({})
  const [dailySummary, setDailySummary] = useState("")
  const { errors, setErrors } = useError();
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  const workoutTypeList = [
    "Strength", "Plyometrics", "Strongman",
    "Powerlifting", "Olympic Weightlifting",
    "Cardio", "Stretching"
  ]

   const data1 = [
        {label: "Burned", value: dailySummary.calories_burned_today, color: "#22C55E"},
        {label: "Remaning", value: user?.daily_calories_burned - dailySummary.calories_burned_today, color: "#1E293B"},
      ]

  const settings = {
    width: 200,
    height: 200,
  }

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
    getDailySummary()
  }, [])

const getDailySummary = async () => {
  try {
    const response = await fetch(`${API_URL}/workouts/summary-today`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    if(response.ok){
      const json = await response.json()
      console.log(json)
      setDailySummary(json)
    } else {
      setErrors(['Failed to fetch daily summary. Please try again.'])
    }
  } catch (error) {
    setErrors(['Failed to fetch daily summary. Please check your connection or try again later.'])
  }
}

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
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="flex flex-col justify-around col-span-1">
        <div></div>
        {/* <div className="row-span-3 h-full flex flex-col justify-around"> */}
            <div className="bg-neutral-card rounded-2xl shadow-md p-4 text-center mx-auto flex flex-col justify-center w-full">
              <h3 className="text-white font-heading text-lg mb-2 tracking-wide">Workout Duration (mins)</h3>
              <div className="mx-auto">
                <PieChart series={[{ 
                              innerRadius: 50, 
                              outerRadius: 100, 
                              data: [
                                {label: "FInished", value: dailySummary.duration_today, color: "#22C55E"},
                                {label: "Remaning", value: dailySummary.remaining_duration, color: "#1E293B"},
                              ],
                              arcLabel: 'value' 
                          }]}
                          {...settings}
                          sx={{
                              [`& .${pieArcClasses.root}`]: {
                                stroke: 'none', // remove white border
                              },
                              [`& .${pieArcLabelClasses.root}`]: {
                                fill: '#FFFFFF',
                                fontSize: '0.75rem',
                                fontWeight: 300,                 // light
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: '0.5px',          // subtle spacing
                                textTransform: 'none',   
                              },
                            }}
                            slotProps={{
                                legend: {
                                  sx: {
                                    // Style legend labels
                                    color: '#FFFFFF',
                                    fontSize: '0.75rem',
                                    fontWeight: 300,
                                    fontFamily: "'Inter', sans-serif",
                                    letterSpacing: '0.5px',
                                    // Style legend marks (circles or squares)
                                    '.MuiChartsLegend-mark': {
                                      // for example, color of mark
                                      fill: '#22C55E',
                                    },
                                  },
                                },
                            }}
                />
              </div>
            </div>
        
            <div className="bg-neutral-card rounded-2xl shadow-md p-4 text-center mx-auto flex flex-col justify-center w-full">
              <h3 className="text-white font-heading text-lg mb-2 tracking-wide">Calories Burned (kcal)</h3>
              <div className="mx-auto">
                <PieChart series={[{ 
                              innerRadius: 50, 
                              outerRadius: 100, 
                              data: [
                                {label: "Burned", value: dailySummary.calories_burned_today, color: "#22C55E"},
                                {label: "Remaning", value: dailySummary.remaining_calories, color: "#1E293B"},
                              ],
                              arcLabel: 'value' 
                          }]}
                          {...settings}
                          sx={{
                              [`& .${pieArcClasses.root}`]: {
                                stroke: 'none', // remove white border
                              },
                              [`& .${pieArcLabelClasses.root}`]: {
                                fill: '#FFFFFF',
                                fontSize: '0.75rem',
                                fontWeight: 300,                 // light
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: '0.5px',          // subtle spacing
                                textTransform: 'none',   
                              },
                            }}
                            slotProps={{
                                legend: {
                                  sx: {
                                    // Style legend labels
                                    color: '#FFFFFF',
                                    fontSize: '0.75rem',
                                    fontWeight: 300,
                                    fontFamily: "'Inter', sans-serif",
                                    letterSpacing: '0.5px',
                                    // Style legend marks (circles or squares)
                                    '.MuiChartsLegend-mark': {
                                      // for example, color of mark
                                      fill: '#22C55E',
                                    },
                                  },
                                },
                            }}
                />
              </div>
            {/* </div> */}
        </div>
      </div>
      <div className="bg-neutral-card rounded-2xl shadow-md p-6 col-span-2 h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl text-accent-green mb-4">Workout History</h2>
          <Link to='/workouts/new' className="text-xs bg-accent-green hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl shadow">
            + Add Workout
          </Link>
        </div>
        { errors && 
          errors.map((error) => (
            <div key={error.id}>
              <h2>{error}</h2>
            </div>
          ))}
        <div className="text-sm overflow-y-auto h-[calc(100%-3rem)]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0">
              <tr className="text-neutral-subtext border-b border-neutral-hover">
                <th className="text-left px-4 py-2 text-sm font-semibold text-white">Workout Date</th>
                <th className="text-left px-4 py-2 text-sm font-semibold text-white">Workout Type</th>
                <th className="text-left px-4 py-2 text-sm font-semibold text-white">Calories Burned (kcal)</th>
                <th className="text-left px-4 py-2 text-sm font-semibold text-white">Duration (mins)</th>
                <th className="text-left px-4 py-2 text-sm font-semibold text-white">No. of Exercises Done</th>
                <th className="text-left px-4 py-2 text-sm font-semibold text-white"></th>
              </tr>
            </thead>
            <tbody>
              { workouts.map((workout) => (
                <>
                <tr 
                  key={workout.id} 
                  onClick={editingRowId === null ? () => navigate(`/workouts/${workout.id}`) : undefined} 
                 className="border-b border-neutral-hover hover:bg-neutral-hover/50"
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
