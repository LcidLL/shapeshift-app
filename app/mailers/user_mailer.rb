class UserMailer < ApplicationMailer
  default from: "shapeshiftsample@gmail.com"

  def reminder_email
    @reminder = params[:reminder]
    # mail(to: "carljasper.brizuela@gmail.com", subject: "🔔 Reminder:Test")
    mail(to: "@reminder.user.email", subject: "🔔 Reminder: #{@reminder.title}")
  end
end
