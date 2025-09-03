class RemoveDurationMinutesFromChallenges < ActiveRecord::Migration[7.2]
  def change
    remove_column :challenges, :duration_minutes, :integer
  end
end
