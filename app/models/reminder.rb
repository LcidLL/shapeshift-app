class Reminder < ApplicationRecord
  belongs_to :daily_plan
  after_create :schedule_reminder

  def schedule_reminder
    ReminderJob.set(wait_until: remind_at).perform_later(self.id)
  end
end
