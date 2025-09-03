class CreateInvitations < ActiveRecord::Migration[7.2]
  def change
    create_table :invitations do |t|
      t.integer :group_config_id
      t.integer :invited_user_id
      t.string :status

      t.timestamps
    end
  end
end
