class ReminderJob < ApplicationJob
  queue_as :default

  def perform(reminder_id)
    Rails.logger.info "Running ReminderJob for reminder_id=#{reminder_id}"
    reminder = Reminder.find(reminder_id)
    Rails.logger.info "Reminder attributes: #{reminder.attributes.inspect}"
    UserMailer.with(reminder: reminder).reminder_email.deliver_now
    Rails.logger.info "Email sent for Reminder #{reminder.id}"
  end
end
    