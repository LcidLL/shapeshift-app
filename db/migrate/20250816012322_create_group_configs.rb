class CreateGroupConfigs < ActiveRecord::Migration[7.2]
  def change
    create_table :group_configs do |t|
      t.integer :creator_user_id
      t.string :invite_code
      t.integer :max_participants

      t.timestamps
    end
  end
end
