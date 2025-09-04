require 'uri'
require 'net/http'

class CalorieNinjasApi
  BASE_URL = 'https://api.calorieninjas.com/v1/nutrition'

  def self.get_nutrition(food_query)
    url = URI("#{BASE_URL}?query=#{URI.encode_www_form_component(food_query)}")
    
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request['X-Api-Key'] = ENV['CALORIE_NINJAS_API_KEY']

    begin
      response = http.request(request)
      
      if response.code == '200'
        data = JSON.parse(response.body)
        
        if data['items'] && data['items'].any?
          item = data['items'].first
          
          {
            success: true,
            data: {
              name: item['name'].titleize,
              calories: item['calories']&.round || 0,
              carbs: item['carbohydrates_total_g']&.round(1) || 0.0,
              protein: item['protein_g']&.round(1) || 0.0,
              fat: item['fat_total_g']&.round(1) || 0.0,
              serving_size: extract_serving_size(food_query),
              unit: extract_unit(food_query) || 'serving'
            }
          }
        else
          {
            success: false,
            message: 'No nutrition data found for this food item'
          }
        end
      elsif response.code == '401'
        {
          success: false,
          message: 'Invalid API key. Please check your CalorieNinjas API key.'
        }
      else
        {
          success: false,
          message: 'Failed to fetch nutrition data',
          error: response.body
        }
      end
    rescue => e
      Rails.logger.error "CalorieNinjas API error: #{e.message}"
      {
        success: false,
        message: 'Network error occurred',
        error: e.message
      }
    end
  end

  private

  def self.extract_serving_size(query)
    match = query.match(/^(\d+(?:\.\d+)?)\s*(\w+)?\s+(.+)/)
    if match
      match[1].to_f
    else
      1.0 # default serving size
    end
  end

  def self.extract_unit(query)
    units = %w[cup cups gram grams g kg piece pieces slice slices tablespoon tbsp teaspoon tsp oz pound lb]
    
    match = query.match(/^(\d+(?:\.\d+)?)\s*(\w+)\s+(.+)/)
    if match && units.include?(match[2].downcase)
      match[2].downcase
    else
      'serving'
    end
  end
end