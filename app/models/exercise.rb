class Exercise < ApplicationRecord
  belongs_to :workout

  validates :exercise_name, presence: true
  validates :sets, presence: true
  validates :reps, presence: true
  validates :weight, presence: true
  validates :duration, presence: true
  validates :intensity, presence: true
  validates :distance, presence: true
end
