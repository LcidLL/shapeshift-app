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
end