class CreateFoodItems < ActiveRecord::Migration[7.2]
  def change
    create_table :food_items do |t|
      t.references :meal, null: false, foreign_key: true
      t.string :food_name, null: false
      t.string :meal_time, null: false # breakfast, lunch, snacks, dinner
      t.float :quantity, null: false
      t.string :unit, null: false # cups, grams, pieces, etc
      t.integer :calories, default: 0, null: false
      t.float :carbs, default: 0.0, null: false    # grams
      t.float :protein, default: 0.0, null: false  # grams
      t.float :fat, default: 0.0, null: false      # grams

      t.timestamps
    end

    add_index :food_items, :meal_time
    add_index :food_items, [:meal_id, :meal_time]
  end
end