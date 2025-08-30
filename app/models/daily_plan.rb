class DailyPlan < ApplicationRecord
  belongs_to :plan
  has_many :exercise_plans, dependent: :destroy
  has_many :reminders, dependent: :destroy

  after_create :create_default_reminder

  validates :workout_date, presence: true, uniqueness: { scope: :plan_id }
  validates :workout_name, presence: true
  validates :day_of_week, presence: true

  def create_default_reminder
    date = self.workout_date
    time = "07:00"
    datetime = Time.zone.parse("#{date} #{time}") 
    reminders.create(remind_at: datetime, title: self.workout_name)
  end
end