class DailyPlan < ApplicationRecord
  belongs_to :plan
  has_many :exercise_plans

  validates :workout_date, presence: true, uniqueness: true
  validates :workout_name, presence: true
  validates :day_of_week, presence: true
end
