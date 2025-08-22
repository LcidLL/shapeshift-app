class Workout < ApplicationRecord
  belongs_to :user
  has_many :exercises, dependent: :destroy

  validates :workout_type, presence: true
  validates :workout_date, presence: true
  validates :duration, presence: true
  validates :calories_burned, presence: true
end
