class RenameIsAddedColumns < ActiveRecord::Migration[7.2]
  def change
    rename_column :daily_plans, :isAdded, :is_added
    rename_column :exercise_plans, :isAdded, :is_added
  end
end