class DailyPlan < ApplicationRecord
  belongs_to :plan
  has_many :exercise_plans
end
