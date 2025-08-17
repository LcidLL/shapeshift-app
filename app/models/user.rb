class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, 
  :confirmable, :jwt_authenticatable, jwt_revocation_strategy: JwtDenyList
  has_many :workouts

  validates :first_name, :last_name, presence: true, allow_blank: false
  validates :age, numericality: {greater_than: 0}, allow_nil: false
  validates :weight, :height, numericality: {greater_than: 0}, allow_nil: false
end
