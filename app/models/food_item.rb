class FoodItem < ApplicationRecord
  belongs_to :meal

  MEAL_TIMES = %w[breakfast lunch snacks dinner].freeze

  validates :food_name, presence: true
  validates :meal_time, presence: true, inclusion: { in: MEAL_TIMES }
  validates :quantity, presence: true, numericality: { greater_than: 0 }
  validates :unit, presence: true
  validates :calories, :carbs, :protein, :fat, numericality: { greater_than_or_equal_to: 0 }

  scope :breakfast, -> { where(meal_time: 'breakfast') }
  scope :lunch, -> { where(meal_time: 'lunch') }
  scope :snacks, -> { where(meal_time: 'snacks') }
  scope :dinner, -> { where(meal_time: 'dinner') }

  def nutrition_per_serving
    {
      calories: calories,
      carbs: carbs,
      protein: protein,
      fat: fat
    }
  end

  def total_nutrition
    {
      calories: (calories * quantity).round,
      carbs: (carbs * quantity).round(1),
      protein: (protein * quantity).round(1),
      fat: (fat * quantity).round(1)
    }
  end

  def quantity_with_unit
    "#{quantity} #{unit}"
  end

  def high_calorie?
    calories > 400
  end

  def calories_per_unit
    return 0 if quantity == 0
    (calories / quantity).round
  end
end