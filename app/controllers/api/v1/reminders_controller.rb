class Api::V1::RemindersController < ApplicationController
  # before_action :authenticate_user! ---- temporary comment
  before_action :set_daily_plan
  before_action :set_reminder, only: [:update]

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

  def update
    if @reminder.update(dreminder_params)
      render json: @reminder
    else
      render json: { errors: @daily_plan.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_daily_plan
    @daily_plan = DailyPlan.find(params[:daily_plan_id])

    # temporary comment
    # unless @daily_plan.plan.user == current_user
    #   render json: { errors: 'Access denied' }, status: :forbidden
    # end
  end

  def set_reminder
    @reminder = @daily_plans.reminders.find(params[:id])
  end

  def reminder_params
    params.require(:reminder).permit(:remind_at, :title)
  end
end
