class RemoveUnusedColumnsFromInvitations < ActiveRecord::Migration[7.2]
  def change
    remove_column :invitations, :group_config_id, :integer
    remove_column :invitations, :invited_user_id, :integer
  end
end
