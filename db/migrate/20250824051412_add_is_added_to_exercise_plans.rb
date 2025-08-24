class AddIsAddedToExercisePlans < ActiveRecord::Migration[7.2]
  def change
    add_column :exercise_plans, :isAdded, :boolean, default: false
  end
end
