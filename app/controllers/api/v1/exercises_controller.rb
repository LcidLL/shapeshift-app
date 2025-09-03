class Api::V1::ExercisesController < ApplicationController
  before_action :set_workout
  before_action :set_exercise, except: [ :index, :create ]

  def index
    exercises = @workout.exercises
    render json: exercises
  end

  def show
    render json: @exercise
  end

  def create
    @exercise = @workout.exercises.build(exercise_params)

    if @exercise.save
      render json: @exercise, status: :created, location: api_v1_workout_exercises_path
    else
      render json: { errors: @exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: { errors: @exercise.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def destroy
    @exercise.destroy
    render json: { message: "Exercise deleted"}
  end

  private

  def set_workout
    @workout = Workout.find(params[:workout_id])
  end

  def set_exercise
    @exercise = Exercise.find(params[:id])
  end

  def exercise_params
    params.require(:exercise).permit(:exercise_name, :exercise_id, :distance, :duration, :intensity, :sets, :reps, :weight)
  end
end
