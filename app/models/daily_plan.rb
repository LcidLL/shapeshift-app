class DailyPlan < ApplicationRecord
  belongs_to :plan
  has_many :exercise_plans, dependent: :destroy
  has_many :reminders, dependent: :destroy

  validates :workout_date, presence: true, uniqueness: { scope: :plan_id }
  validates :workout_name, presence: true
  validates :day_of_week, presence: true
end