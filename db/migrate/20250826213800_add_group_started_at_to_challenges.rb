class AddGroupStartedAtToChallenges < ActiveRecord::Migration[7.2]
  def change
    add_column :challenges, :group_started_at, :datetime
  end
end
