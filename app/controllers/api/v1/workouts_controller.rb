class Api::V1::WorkoutsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_workout, except: [ :index, :create, :summary, :daily_summary]

  def index
    @workouts = current_user.workouts.order(workout_date: :desc)
    render json: @workouts.as_json(methods: :exercises_count)
  end

  def show 
    render json: @workout
  end

  def create
    @workout = current_user.workouts.build(workout_params)

    if @workout.save
      render json: @workout, status: :created, location: api_v1_workouts_path
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @workout.update(workout_params)
      render json: @workout
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @workout.destroy
    render json: { message: "Workout deleted"}
  end

  def summary
    @workouts = current_user.workouts
    period = params[:period]&.to_sym
    begin
      data = @workouts.summary_by_period(period)
      render json: data
    rescue ArgumentError => e
      render json: { errors: e.message }, status: :bad_request
    end
  end

  def daily_summary
    @workouts = current_user.workouts
    data = @workouts.summary_today
    render json: data
  end

  private

  def workout_params
    params.require(:workout).permit(:workout_type, :workout_date, :duration, :calories_burned)
  end

  def set_workout
    @workout = Workout.find(params[:id])
  end
end
