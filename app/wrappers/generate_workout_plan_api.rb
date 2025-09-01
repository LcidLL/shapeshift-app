require 'uri'
require 'net/http'

class GenerateWorkoutPlanApi
  def self.generate_workout(goal:, fitness_level:, equipment:, days_per_week:, session_duration_minutes:, medical_conditions:, exercise_restrictions:)
    url = URI("https://ai-workout-meal-plan-generator-fitforge-ai.p.rapidapi.com/api/generateWorkoutPlan")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["x-rapidapi-key"] = ENV['RAPIDAPI_KEY']
    request["x-rapidapi-host"] = ENV['RAPIDAPI_HOST_1']
    request["Content-Type"] = 'application/json'
    
    body = {
      goal: goal,
      fitness_level: fitness_level,
      equipment: equipment,
      days_per_week: days_per_week.to_i,
      session_duration_minutes: session_duration_minutes.to_i,
      medical_conditions: medical_conditions,
      exercise_restrictions: exercise_restrictions
    }

    request.body = body.to_json

    response = http.request(request)
    JSON.parse(response.read_body)
  end
end