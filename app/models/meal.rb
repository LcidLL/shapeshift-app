class Meal < ApplicationRecord
  belongs_to :user
  has_many :food_items, dependent: :destroy

  validates :meal_date, presence: true, uniqueness: { scope: :user_id }
  validates :daily_calorie_goal, :daily_carbs_goal, :daily_protein_goal, :daily_fat_goal, 
           numericality: { greater_than: 0 }

  def total_calories
    food_items.sum(:calories)
  end

  def total_carbs
    food_items.sum(:carbs).round(1)
  end

  def total_protein
    food_items.sum(:protein).round(1)
  end

  def total_fat
    food_items.sum(:fat).round(1)
  end

  def calorie_progress
    return 0 if daily_calorie_goal == 0
    (total_calories.to_f / daily_calorie_goal * 100).round(1)
  end

  def carbs_progress
    return 0 if daily_carbs_goal == 0
    (total_carbs.to_f / daily_carbs_goal * 100).round(1)
  end

  def protein_progress
    return 0 if daily_protein_goal == 0
    (total_protein.to_f / daily_protein_goal * 100).round(1)
  end

  def fat_progress
    return 0 if daily_fat_goal == 0
    (total_fat.to_f / daily_fat_goal * 100).round(1)
  end

  # Get food items by meal time
  def breakfast_items
    food_items.where(meal_time: 'breakfast')
  end

  def lunch_items
    food_items.where(meal_time: 'lunch')
  end

  def snacks_items
    food_items.where(meal_time: 'snacks')
  end

  def dinner_items
    food_items.where(meal_time: 'dinner')
  end

  # Get calories by meal time
  def breakfast_calories
    breakfast_items.sum(:calories)
  end

  def lunch_calories
    lunch_items.sum(:calories)
  end

  def snacks_calories
    snacks_items.sum(:calories)
  end

  def dinner_calories
    dinner_items.sum(:calories)
  end

  # Check if daily goals are met
  def calorie_goal_met?
    total_calories >= daily_calorie_goal
  end

  def macros_balanced?
    [carbs_progress, protein_progress, fat_progress].all? { |progress| progress >= 80 }
  end
end