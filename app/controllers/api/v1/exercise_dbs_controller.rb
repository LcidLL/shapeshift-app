class Api::V1::ExerciseDbsController < ApplicationController

  def index
    exercise_dbs = ExerciseDb.all
    workout_type = params[:workout_type]
    exercise_name = params[:exercise_name]
    data = exercise_dbs.select { |exercise| exercise["category"] == workout_type.downcase} if workout_type.present?
    if exercise_name.present?
      singularized_name = exercise_name.singularize.downcase
      data = exercise_dbs.select { |exercise| exercise["exercise_name"].downcase.include?(singularized_name) }
    end
    render json: {data: data, all: exercise_dbs}
  end

  def update
    if @exercise_db.update(exercise_plan_params)
      render json: @exercise_plan
    else
      render json: { errors: @exercise_plan.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def exercise_plan_params
    params.require(:exercise_db).permit(:exercise_name, :exercise_id, :category)
  end
end
