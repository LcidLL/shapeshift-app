class AddUserAndChallengeToInvitations < ActiveRecord::Migration[7.2]
  def change
    add_reference :invitations, :user, null: false, foreign_key: true
    add_reference :invitations, :challenge, null: false, foreign_key: true
  end
end
