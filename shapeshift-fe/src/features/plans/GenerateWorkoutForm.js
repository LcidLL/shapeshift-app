import React from 'react';
import { useForm } from 'react-hook-form';
import mockData from '../../mockResponse.json'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants/Constants';

function GenerateWorkoutForm(){
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    // Convert comma-separated strings to arrays
    data.equipment = convertToArray(data.equipment);
    data.medical_conditions = convertToArray(data.medical_conditions);
    data.exercise_restrictions = convertToArray(data.exercise_restrictions);
 
    try{
      const response = await fetch(`${API_URL}/users/1/generate-workout`, {
        method: "POST",
        headers: {
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
    navigate('/generate-workout-results', { state: { result: mockData } })
  }

  return(
    <div>
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Fitness Plan Setup</h2>
      <button onClick={()=> sendMock()}>Send</button>
      {/* Goal */}
      <label>Fitness Goal *</label>
      <select {...register('goal', { required: true })}>
        <option value="">Select your goal</option>
        <option value="Build muscle">Build muscle</option>
        <option value="Lose fat">Lose fat</option>
        <option value="General fitness">General fitness</option>
        <option value="Improve endurance">Improve endurance</option>
        <option value="Strength training">Strength training</option>
      </select>
      {errors.goal && <p style={{ color: 'red' }}>Goal is required</p>}

      {/* Fitness Level */}
      <label>Fitness Level *</label>
      <select {...register('fitness_level', { required: true })}>
        <option value="">Select your fitness level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      {errors.fitness_level && <p style={{ color: 'red' }}>Fitness level is required</p>}

      {/* Equipment */}
      <label>Available Equipment *</label>
      <input
        type="text"
        placeholder="Comma separated (e.g. Dumbbells, Pull-up bar)"
        {...register('equipment', { required: true })}
      />
      {errors.equipment && <p style={{ color: 'red' }}>Equipment is required</p>}

      {/* Days per week */}
      <label>Workout Days per Week *</label>
      <input
        type="number"
        {...register('days_per_week', { required: true, min: 1, max: 7 })}
      />
      {errors.days_per_week && <p style={{ color: 'red' }}>Must be between 1 and 7</p>}

      {/* Session Duration */}
      <label>Session Duration (Minutes) *</label>
      <input
        type="number"
        {...register('session_duration_minutes', { required: true, min: 15, max: 180 })}
      />
      {errors.session_duration_minutes && <p style={{ color: 'red' }}>Must be between 15 and 180</p>}

      {/* Medical Conditions */}
      <label>Medical Conditions (Optional)</label>
      <input
        type="text"
        placeholder="Comma separated (e.g. knee injury, back pain)"
        {...register('medical_conditions')}
      />

      {/* Exercise Restrictions */}
      <label>Exercise Restrictions (Optional)</label>
      <input
        type="text"
        placeholder="Comma separated (e.g. squats, deadlifts)"
        {...register('exercise_restrictions')}
      />

        <button type="submit" style={{ marginTop: 20 }}>Submit</button>
      </form>
    </div>
  )
}

export default GenerateWorkoutForm;