class Api::V1::RemindersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_daily_plan
  # before_action :set_reminder

  def index
    @reminders = @daily_plan.reminders
    render json: @reminders
  end

  def create
    @reminder = @daily_plan.reminders.build(reminder_params)
    if @reminder.save
      render json: @reminder, status: :created
    else
      render json: { errors: @reminder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_daily_plan
    @daily_plan = DailyPlan.find(params[:daily_plan_id])

    unless @daily_plan.plan.user == current_user
      render json: { error: 'Access denied' }, status: :forbidden
    end
  end

  def set_reminder
    @reminder = @daily_plans.reminders.find(params[:id])
  end

  def reminder_params
    params.require(:reminder).permit(:remind_at)
  end
end
