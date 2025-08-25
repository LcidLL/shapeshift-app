class CreateReminders < ActiveRecord::Migration[7.2]
  def change
    create_table :reminders do |t|
      t.datetime :remind_at
      t.references :daily_plan, null: false, foreign_key: true

      t.timestamps
    end
  end
end
