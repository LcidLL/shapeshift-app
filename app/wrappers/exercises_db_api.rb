require 'uri'
require 'net/http'

class ExercisesDbApi
  def self.get_exercise_info(exercise_id)
    url = URI("https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercise/#{exercise_id}")

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-key"] = '7b751feb97msh677e0468da881d4p158468jsnd7d8217352de'
    request["x-rapidapi-host"] = 'exercise-db-fitness-workout-gym.p.rapidapi.com'

    response = http.request(request)
    JSON.parse(response.read_body)
  end

  def self.get_exercises(equipment,muscle,level,mechanic)
    base_url = "https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/filter"

     # Determine if you want to filter
    filters = {}
    filters[:equipment] = equipment unless equipment.empty?
    filters[:muscle] = muscle unless muscle.empty?
    filters[:level] = level unless level.empty?
    filters[:mechanic] = mechanic unless mechanic.empty?

    url = URI(base_url)
    url.query = URI.encode_www_form(filters) if filters.any?

    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["x-rapidapi-key"] = '7b751feb97msh677e0468da881d4p158468jsnd7d8217352de'
    request["x-rapidapi-host"] = 'exercise-db-fitness-workout-gym.p.rapidapi.com'

    response = http.request(request)
    JSON.parse(response.read_body)
  end
end