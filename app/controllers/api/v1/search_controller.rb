class Api::V1::SearchController < ApplicationController
  def index
    name_query = params[:name]
    workout_type = params[:workout_type]
    data = ExercisesDbApi.get_exercises(params[:equipment], params[:muscle], params[:level], params[:mechanic])
    data = data.select { |exercise| exercise["category"] == workout_type.downcase} if workout_type.present? 
    data = data.select { |exercise| exercise["name"]&.downcase&.include?(name_query.downcase) } if name_query.present?
    render json: data
  end

  def get_info
    exercise_id = params[:exercise_id]
    data = ExercisesDbApi.get_exercise_info(exercise_id)
    render json: data
  end
end
