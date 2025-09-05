import React, { useState, useEffect } from "react";
import { API_URL } from "../../constants/Constants";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import ExercisesList from "../exercises/ExercisesList";
import NewWorkoutForm from "./NewWorkoutForm"
import { useError } from "../../contexts/ErrorContext";
import { FilePenLine, Trash2, Edit } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { PieChart, pieArcClasses, pieArcLabelClasses } from "@mui/x-charts";
import { Tooltip } from "@mui/material";

function WorkoutDetails(){

  const { id } = useParams()
  const navigate = useNavigate()
  
  const [workout, setWorkout] = useState("")
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [remaining, setRemaining] = useState("")

  const { errors, setErrors } = useError();

  const { user } = useAuth()

  const token = localStorage.getItem('token');

    const settings = {
    width: 200,
    height: 200,
  }

  useEffect(() => {
    // clear error after displaying it once
    return () => setErrors(null);
  }, []);

  useEffect(() => {
    async function displayWorkoutDetails(){
      try{
        const response = await fetch(`${API_URL}/workouts/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.ok) {
          const json = await response.json();
          setWorkout(json.data)
          setRemaining(json.remaining)
        } else {
          const { errors } = await response.json();
          setErrors(errors || ['Failed to fetch workout'])
          navigate("/workouts")
        }
      } catch (e) {
        setErrors(['Failed to fetch workout. Please check your connection or try again later.'])
      }
    }
    displayWorkoutDetails()
  }, [id])

  const editWorkout = async (editedData) => {
    const response = await fetch(`${API_URL}/workouts/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedData)
    });

    if(response.ok){
      const json = await response.json();
      setWorkout(json)
      setIsDisplayed(false)
      navigate(`/workouts/${id}`);
    } else {
      console.log("Error occured")
    }
  }

  const deleteWorkout = async (workout_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this workout?");
    if (!confirmed) return;

    const response = await fetch(`${API_URL}/workouts/${workout_id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if(response.ok){
      navigate(`/workouts`);
    } else {
      console.log("Error occured")
    }
  }

  return (
    <div className="space-y-6">
      { errors && 
        errors.map((error) => (
          <div key={error.id}>
            <h2>{error}</h2>
          </div>
        )) }
        { !isDisplayed && <>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-2xl font-semibold text-white flex items-center gap-3">Workout details
            <span className="flex gap-1">
              <Tooltip title="Edit Workout" placement="bottom" arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  },
              }}>
                <span>
                  <button
                    onClick={() => setIsDisplayed(true)}
                    className="p-1 rounded-lg hover:bg-neutral-hover"
                    title="Edit exercises"
                  >
                    <Edit className="w-4 h-4 text-accent-green" />
                  </button>
                </span>
              </Tooltip>
              <Tooltip title="Delete Workout" placement="bottom" arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  },
              }}>
                <span>
                  <button
                    onClick={() => deleteWorkout(workout.id)}
                    className="p-1 rounded-lg hover:bg-neutral-hover"
                    title="Delete exercises"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </span>
              </Tooltip>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-neutral-card rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
            <h2 className="font-heading text-xl text-white mb-4">Workout Summary</h2>
            <div className="space-y-3 text-white">
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Workout Date:</span>
                <span>{workout.workout_date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Type:</span>
                <span>{workout.workout_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Calories Burned:</span>
                <span>{workout.calories_burned} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Duration:</span>
                <span>{workout.duration} min</span>
              </div>
            </div>
          </div>
          {/* <div className="bg-neutral-card rounded-2xl shadow-md p-6 w-full max-w-md mx-auto flex flex-row col-span-2"> */}
            <div className="bg-neutral-card rounded-2xl shadow-md p-4 w-full max-w-md mx-auto">
               <h3 className="text-white font-heading text-lg mb-3 tracking-wide">Calories</h3>
            <PieChart series={[{ 
                              innerRadius: 50, 
                              outerRadius: 100, 
                              data: [
                                {label: "Burned", value: workout.calories_burned, color: "#22C55E"},
                                {label: "Remaning", value: remaining.calories, color: "#1E293B"},
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
                <div className="bg-neutral-card rounded-2xl shadow-md p-4 w-full max-w-md mx-auto">
              <h3 className="text-white font-heading text-lg mb-3 tracking-wide">Duration</h3>
            <PieChart series={[{ 
                              innerRadius: 50, 
                              outerRadius: 100, 
                              data: [
                                {label: "Finished", value: workout.duration, color: "#22C55E"},
                                {label: "Remaning", value: remaining.duration, color: "#1E293B"},
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
          
          <div></div>
      </div>
      <ExercisesList workout={workout}/>
      </>
      }
        
      {
        isDisplayed && 
        <NewWorkoutForm 
          workout={workout} 
          mode="edit" 
          onSubmit={(data) => editWorkout(data)}
          setIsDisplayed = {setIsDisplayed}
        />
      }
      
    </div>
  )
}

export default WorkoutDetails;
