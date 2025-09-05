class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, 
         :validatable,
         :confirmable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  before_create :set_jti

  has_many :workouts, dependent: :destroy
  has_many :plans, dependent: :destroy
  has_many :meals, dependent: :destroy

  validates :first_name, :last_name, presence: true
  validates :age, numericality: {greater_than: 0}, allow_nil: true
  validates :weight, :height, numericality: {greater_than: 0}, allow_nil: true
  validates :sex, inclusion: { in: %w[male female other] }, allow_nil: true
  validates :daily_calorie_intake, :daily_calories_burned,
           :workout_duration, :target_weight, 
           numericality: { greater_than: 0 }, allow_nil: true

  def todays_meal
    meals.find_or_create_by(meal_date: Date.current) do |meal|
      meal.daily_calorie_goal = daily_calorie_intake || 2000
      meal.daily_carbs_goal = 250    # grams (~45-65% of calories)
      meal.daily_protein_goal = 150  # grams (~10-35% of calories)  
      meal.daily_fat_goal = 80       # grams (~20-35% of calories)
    end
  end

  def meal_for_date(date)
    meals.find_or_create_by(meal_date: date) do |meal|
      meal.daily_calorie_goal = daily_calorie_intake || 2000
      meal.daily_carbs_goal = 250
      meal.daily_protein_goal = 150
      meal.daily_fat_goal = 80
    end
  end

  # average daily calories over last 7 days
  def average_daily_calories(days = 7)
    recent_meals = meals.where(meal_date: days.days.ago..Date.current)
    return 0 if recent_meals.empty?
    
    total_calories = recent_meals.sum { |meal| meal.total_calories }
    (total_calories / recent_meals.count.to_f).round
  end

  # meal log checker
  def active_meal_logger?
    meals.where(meal_date: 3.days.ago..Date.current).exists?
  end

  private

  def set_jti
    self.jti ||= SecureRandom.uuid
  end
end