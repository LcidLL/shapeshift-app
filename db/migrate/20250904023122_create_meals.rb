class CreateMeals < ActiveRecord::Migration[7.2]
  def change
    create_table :meals do |t|
      t.references :user, null: false, foreign_key: true
      t.date :meal_date, null: false
      t.integer :daily_calorie_goal, default: 2000, null: false
      t.integer :daily_carbs_goal, default: 250, null: false   # grams
      t.integer :daily_protein_goal, default: 150, null: false # grams
      t.integer :daily_fat_goal, default: 80, null: false      # grams

      t.timestamps
    end

    add_index :meals, [:user_id, :meal_date], unique: true
  end
end