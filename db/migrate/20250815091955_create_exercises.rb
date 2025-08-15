class CreateExercises < ActiveRecord::Migration[7.2]
  def change
    create_table :exercises do |t|
      t.string :exercise_name
      t.string :exercise_id
      t.integer :sets
      t.integer :reps
      t.float :weight
      t.string :intensity
      t.float :distance
      t.float :duration
      t.references :workout, null: false, foreign_key: true

      t.timestamps
    end
  end
end
