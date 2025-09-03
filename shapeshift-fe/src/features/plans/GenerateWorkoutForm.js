import React from 'react';
import { useForm } from 'react-hook-form';
import mockData from '../../mockResponse.json'
import mockData2 from '../../mockResponse2.json'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants/Constants';

function GenerateWorkoutForm(){
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const onSubmit = async (data) => {
    // Convert comma-separated strings to arrays
    data.equipment = convertToArray(data.equipment);
    data.medical_conditions = convertToArray(data.medical_conditions);
    data.exercise_restrictions = convertToArray(data.exercise_restrictions);
 
    try{
      const response = await fetch(`${API_URL}/generate-workout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (response.ok){
        const json = await response.json()
        console.log(json)
        navigate('/generate-workout-results', { state: { result: json} })
      } else {
        
      }
    }catch (error) {
      console.log('Error')
    }
  }

  function convertToArray(value) {
  return value
    ? value.split(',').map(item => item.trim()).filter(Boolean)
    : [];
}

  const sendMock = async () => {
    //navigate('/generate-workout-results', { state: { result: mockData } })
    navigate('/generate-workout-results', { state: { result: mockData2 } })
  }

  return(
    <div>
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: 'auto' }} className="space-y-4">
      <h2>Fitness Plan Setup</h2>
      <button onClick={()=> sendMock()}>Send</button>
      {/* Goal */}
      <label className="block text-white text-sm mb-1 font-sans">Fitness Goal *</label>
      <select {...register('goal', { required: true })} className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green">
        <option value="">Select your goal</option>
        <option value="Build muscle">Build muscle</option>
        <option value="Lose fat">Lose fat</option>
        <option value="General fitness">General fitness</option>
        <option value="Improve endurance">Improve endurance</option>
        <option value="Strength training">Strength training</option>
      </select>
      {errors.goal && <p style={{ color: 'red' }}>Goal is required</p>}

      {/* Fitness Level */}
      <label className="block text-white text-sm mb-1 font-sans">Fitness Level *</label>
      <select {...register('fitness_level', { required: true })} className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green">
        <option value="">Select your fitness level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      {errors.fitness_level && <p style={{ color: 'red' }}>Fitness level is required</p>}

      {/* Equipment */}
      <label className="block text-white text-sm mb-1 font-sans">Available Equipment *</label>
      <input
        type="text"
        placeholder="Comma separated (e.g. Dumbbells, Pull-up bar)"
        {...register('equipment', { required: true })}
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
      />
      {errors.equipment && <p style={{ color: 'red' }}>Equipment is required</p>}

      {/* Days per week */}
      <label className="block text-white text-sm mb-1 font-sans">Workout Days per Week *</label>
      <input
        type="number"
        {...register('days_per_week', { required: true, min: 1, max: 7 })}
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
      />
      {errors.days_per_week && <p style={{ color: 'red' }}>Must be between 1 and 7</p>}

      {/* Session Duration */}
      <label className="block text-white text-sm mb-1 font-sans">Session Duration (Minutes) *</label>
      <input
        type="number"
        {...register('session_duration_minutes', { required: true, min: 15, max: 180 })}
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
      />
      {errors.session_duration_minutes && <p style={{ color: 'red' }}>Must be between 15 and 180</p>}

      {/* Medical Conditions */}
      <label className="block text-white text-sm mb-1 font-sans">Medical Conditions (Optional)</label>
      <input
        type="text"
        placeholder="Comma separated (e.g. knee injury, back pain)"
        {...register('medical_conditions')}
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
      />

      {/* Exercise Restrictions */}
      <label className="block text-white text-sm mb-1 font-sans">Exercise Restrictions (Optional)</label>
      <input
        type="text"
        placeholder="Comma separated (e.g. squats, deadlifts)"
        {...register('exercise_restrictions')}
        className="w-full bg-neutral-hover text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-green"
      />

        <button type="submit" style={{ marginTop: 20 }} className="w-full bg-accent-green hover:bg-green-600 text-white font-semibold py-2 rounded-xl shadow">Submit</button>
      </form>
    </div>
  )
}

export default GenerateWorkoutForm;