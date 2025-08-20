class Plan < ApplicationRecord
  belongs_to :user
  has_many :daily_plans

  validates :plan_name, presence: true
end
