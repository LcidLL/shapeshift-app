class AddProfileFieldsToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :age, :integer
    add_column :users, :sex, :string
    add_column :users, :weight, :float
    add_column :users, :height, :float
    add_column :users, :daily_calorie_intake, :integer
    add_column :users, :daily_calories_burned, :integer
    add_column :users, :workout_duration, :integer
    add_column :users, :target_weight, :float
  end
end
