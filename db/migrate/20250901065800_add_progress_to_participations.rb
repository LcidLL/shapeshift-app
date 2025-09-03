class AddProgressToParticipations < ActiveRecord::Migration[7.0]
  def change
    add_column :participations, :progress, :integer, default: 0, null: false
  end
end
