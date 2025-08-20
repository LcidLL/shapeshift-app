class CreateExerciseDbs < ActiveRecord::Migration[7.2]
  def change
    create_table :exercise_dbs do |t|
      t.string :exercise_name
      t.string :exercise_id
      t.string :category

      t.timestamps
    end
  end
end
