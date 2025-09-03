class AddDurationToChallenges < ActiveRecord::Migration[7.2]
  def change
    add_column :challenges, :duration, :integer, comment: "Duration in minutes or as appropriate for the challenge."
  end
end
