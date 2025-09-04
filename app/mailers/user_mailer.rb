class UserMailer < ApplicationMailer
  default from: "shapeshiftsample@gmail.com"

  def reminder_email
    @reminder = params[:reminder]
    @user = @reminder.daily_plan.plan.user
    
    mail(
      to: @user.email, 
      subject: "🔔 Reminder: #{@reminder.title}"
    )
  end

  def reminder_missed(user, missed_plans_ids)
    @user = user
    @missed_daily_plans = DailyPlan.where(id: missed_plans_ids)

    mail(
      to: user.email, 
      subject: "🔔 Reminder: Missed"
    )
  end

  def reminder_today(user, todays_plans_ids)
    @user = user
    @missed_daily_plans = DailyPlan.where(id: todays_plans_ids)

    mail(
      to: user.email, 
      subject: "🔔 Reminder: Workout Today"
    )
  end
end