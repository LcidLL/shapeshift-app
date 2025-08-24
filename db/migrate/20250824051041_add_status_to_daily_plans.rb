class AddStatusToDailyPlans < ActiveRecord::Migration[7.2]
  def change
    add_column :daily_plans, :isAdded, :boolean, default: false
  end
end
