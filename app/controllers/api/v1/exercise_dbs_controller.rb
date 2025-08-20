class Api::V1::ExerciseDbsController < ApplicationController

  def index
    exercise_dbs = ExerciseDb.all
    workout_type = params[:workout_type]
    data = exercise_dbs.select { |exercise| exercise["category"] == workout_type.downcase}
    render json: data
  end

  def update
    if @exercise_db.update(exercise_plan_params)
      render json: @exercise_plan
    else
      render json: { errors: @exercise_plan.errors }, status: :unprocessable_entity
    end
  end

  private

  def exercise_plan_params
    params.require(:exercise_db).permit(:exercise_name, :exercise_id, :category)
  end
end
