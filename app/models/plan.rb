class Plan < ApplicationRecord
  belongs_to :user
  has_many :daily_plans, dependent: :destroy

  validates :plan_name, presence: true

  def daily_plans_count
    daily_plans.count
  end
end
