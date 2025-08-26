class UserMailer < ApplicationMailer
  default from: "shapeshiftsample@gmail.com"

  def reminder_email
    @reminder = params[:reminder]
    @user = @reminder.daily_plan.plan.user
    @daily_plan = @reminder.daily_plan
    
    mail(
      to: @user.email, 
      subject: "🔔 Reminder: #{@daily_plan.workout_name}"
    )
  end
end
