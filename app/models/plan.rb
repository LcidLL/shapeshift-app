class Plan < ApplicationRecord
  belongs_to :user
  has_many :daily_plans
end
