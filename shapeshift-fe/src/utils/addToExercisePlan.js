import { API_URL } from "../constants/Constants";

export async function addToExercisePlan(exerciseData, planId, dailyPlanId) {
  const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/plans/${planId}/daily_plans/${dailyPlanId}/exercise_plans`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseData)
          })

          if (response.ok) {
            return { success: true };
          } else {
            const data = await response.json();
            return { success: false, errors: data.errors };
          }
}