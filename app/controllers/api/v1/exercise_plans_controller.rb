class Api::V1::ExercisePlansController < ApplicationController
  before_action :set_daily_plan
  before_action :set_exercise_plan, except: [ :index, :create]

  def index
    @exercise_plans = @daily_plan.exercise_plans
    render json: @exercise_plans
  end

  def show
    render json: @exercise_plan
  end

  def create
    @exercise_plan = @daily_plan.exercise_plans.build(exercise_plan_params)

    if @exercise_plan.save
      render json: @exercise_plan, status: :created, location: api_v1_user_plan_daily_plans_path
    else
      render json: { errors: @exercise_plan.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @exercise_plan.update(exercise_plan_params)
      render json: @exercise_plan
    else
      render json: { errors: @exercise_plan.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @exercise_plan.destroy
    render json: {message: "Exercise deleted"}
  end
  
  private

  def set_daily_plan
    @daily_plan = DailyPlan.find(params[:daily_plan_id])
  end

  def set_exercise_plan
    @exercise_plan = @daily_plan.exercise_plans.find(params[:id])
  end

  def exercise_plan_params
    params.require(:exercise_plan).permit(:exercise_name, :sets, :reps, :intensity, :duration, :distance)
  end
end
