class AddTitleToReminders < ActiveRecord::Migration[7.2]
  def change
    add_column :reminders, :title, :string
  end
end
