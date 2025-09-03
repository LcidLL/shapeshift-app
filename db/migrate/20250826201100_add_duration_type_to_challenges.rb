class AddDurationTypeToChallenges < ActiveRecord::Migration[7.2]
  def change
    add_column :challenges, :duration_type, :string
  end
end
