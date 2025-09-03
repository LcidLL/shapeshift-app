class SetPendingForNullStatusInInvitations < ActiveRecord::Migration[7.2]
  def up
    Invitation.where(status: nil).update_all(status: 'pending')
  end

  def down
    # No-op: can't distinguish which were originally null
  end
end
