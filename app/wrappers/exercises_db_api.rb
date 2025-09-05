require 'uri'
require 'net/http'

class ExercisesDbApi
  def self.get_exercise_info(exercise_id)
    url = URI("https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercise/#{exercise_id}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-key"] = ENV['RAPIDAPI_KEY']
    request["x-rapidapi-host"] = ENV['RAPIDAPI_HOST']

    response = http.request(request)
    JSON.parse(response.read_body)
  end

  def self.get_exercises(equipment,muscle,level,mechanic)
    base_url = "https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/filter"

    # Determine if you want to filter
    filters = {}
    filters[:equipment] = equipment.sub(/^./, &:downcase).gsub(' ', '_') if equipment.present?
    filters[:muscle] = muscle.sub(/^./, &:downcase).gsub(' ', '_') if muscle.present?
    filters[:level] = level.sub(/^./, &:downcase) if level.present?
    filters[:mechanic] = mechanic.sub(/^./, &:downcase) if mechanic.present?

    url = URI(base_url)
    url.query = URI.encode_www_form(filters) if filters.any?

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-key"] = ENV['RAPIDAPI_KEY']
    request["x-rapidapi-host"] = ENV['RAPIDAPI_HOST']

    response = http.request(request)
    JSON.parse(response.read_body)
  end
end