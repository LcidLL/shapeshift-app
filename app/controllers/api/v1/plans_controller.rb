class Api::V1::PlansController < ApplicationController
  before_action :set_user, except: [ :generate ]
  before_action :set_plan, except: [ :index, :create, :generate ]

  def index
    @plans = @user.plans
    render json: @plans
  end

  def show
    render json: @plan
  end

  def create
    @plan = @user.plans.build(plan_params)

    if @plan.save
      render json: @plan, status: :created, location: api_v1_user_plans_path
    else
      render json: { errors: @plan.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @plan.update(plan_params)
      render json: @plan
    else
      render json: { errors: @plan.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @plan.destroy
    render json: { message: "Workout plan deleted"}
  end

  def generate
    workout_plan = GenerateWorkoutPlanApi.generate_workout(**workout_params.to_h.symbolize_keys)

    render json: workout_plan, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def set_plan
    @plan = Plan.find(params[:id])
  end

  def plan_params
    params.require(:plan).permit(:plan_name, :description)
  end

  def workout_params
    params.permit(
      :goal,
      :fitness_level,
      :days_per_week,
      :session_duration_minutes,
      equipment: [],
      medical_conditions: [],
      exercise_restrictions: []
    )
  end
end
