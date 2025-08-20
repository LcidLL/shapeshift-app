class CreateDailyPlans < ActiveRecord::Migration[7.2]
  def change
    create_table :daily_plans do |t|
      t.string :workout_name
      t.string :day_of_week
      t.date :workout_date
      t.references :plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
