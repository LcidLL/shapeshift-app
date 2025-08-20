class ExerciseDb < ApplicationRecord
  validates :exercise_name, presence: true, uniqueness: true
  validates :exercise_id, presence: true, uniqueness: true
  validates :category, presence: true
end
