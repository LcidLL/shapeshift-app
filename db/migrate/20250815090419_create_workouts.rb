class CreateWorkouts < ActiveRecord::Migration[7.2]
  def change
    create_table :workouts do |t|
      t.string :workout_type
      t.date :workout_date
      t.float :duration
      t.float :calories_burned
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
