class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, 
         :validatable,
         :confirmable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :workouts
  has_many :plans

  validates :first_name, :last_name, presence: true, allow_blank: true
  validates :age, numericality: {greater_than: 0}, allow_nil: true
  validates :weight, :height, numericality: {greater_than: 0}, allow_nil: true
  validates :sex, inclusion: { in: %w[male female other] }, allow_nil: true
  validates :daily_calorie_intake, :daily_calories_burned,
           :workout_duration, :target_weight, 
           numericality: { greater_than: 0 }, allow_nil: true
end