class Api::V1::DailyPlansController < ApplicationController
  before_action :set_plan
  before_action :set_daily_plan, except: [ :index, :create ]
  before_action :set_daily_plans, except: [ :show, :create ]
  

  def index
    render json: @daily_plans
  end

  def show
    render json: @daily_plan
  end

  def create
    @daily_plan = @plan.daily_plans.build(daily_plan_params)

    if @daily_plan.save
      render json: @daily_plan, status: :created, location: api_v1_user_plan_daily_plans_path
    else
      render json: { errors: @daily_plan.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @daily_plan.update(daily_plan_params)
      render json: @daily_plans
    else
      render json: { errors: @daily_plan.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @daily_plan.destroy
    render json: { data: @daily_plans, message: "Workout daily_plan deleted"}
  end

  private

  def set_plan
    @plan = Plan.find(params[:plan_id])
  end

  def set_daily_plan
    @daily_plan = DailyPlan.find(params[:id])
  end

  def daily_plan_params
    params.require(:daily_plan).permit(:workout_name, :workout_date, :day_of_week)
  end

  def set_daily_plans
    @daily_plans = @plan.daily_plans
  end
end
