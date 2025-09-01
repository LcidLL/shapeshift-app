class UserMailer < ApplicationMailer
  default from: "shapeshiftsample@gmail.com"

  def reminder_email
    @reminder = params[:reminder]
    # @user = @reminder.daily_plan.plan.user --- temporary comment
    
    mail(
      to: "carljasper.brizuela@gmail.com", 
      subject: "🔔 Reminder: #{@reminder.title}"
    )
  end
end