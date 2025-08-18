class Api::V1::WorkoutsController < ApplicationController
  before_action :set_user
  before_action :set_workout, except: [ :index, :create, :search]

  def index
    @workouts = @user.workouts.order(workout_date: :desc)
    render json: @workouts
  end

  def show 
    render json: @workout
  end

  def create
    @workout = @user.workouts.build(workout_params)

    if @workout.save
      render json: @workout, status: :created, location: api_v1_user_workouts_path
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: { errors: @workout.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @workout.destroy
    render json: { message: "Workout deleted"}
  end

  def search
    @workout = Workout.find(params[:workout_id])
    w_type = params[:workout_type].downcase
    data = ExercisesDbApi.get_exercises()
    exercise_list = data.select { |exercise| exercise["category"] == w_type}
    render json: exercise_list
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def workout_params
    params.require(:workout).permit(:workout_type, :workout_date, :duration, :calories_burned)
  end

  def set_workout
    @workout = Workout.find(params[:id])
  end

end
