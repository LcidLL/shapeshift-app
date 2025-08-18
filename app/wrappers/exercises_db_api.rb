require 'uri'
require 'net/http'

class ExercisesDbApi
  def self.get_exercises
    url = URI("https://exercise-db-fitness-workout-gym.p.rapidapi.com/exercises/filter")

  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true

  request = Net::HTTP::Get.new(url)
  request["x-rapidapi-key"] = '7b751feb97msh677e0468da881d4p158468jsnd7d8217352de'
  request["x-rapidapi-host"] = 'exercise-db-fitness-workout-gym.p.rapidapi.com'

  response = http.request(request)
    JSON.parse(response.read_body)
  end
end