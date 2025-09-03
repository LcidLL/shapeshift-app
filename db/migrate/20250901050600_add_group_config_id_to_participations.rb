class AddGroupConfigIdToParticipations < ActiveRecord::Migration[6.0]
  def change
    add_column :participations, :group_config_id, :integer
    add_index :participations, :group_config_id
  end
end
