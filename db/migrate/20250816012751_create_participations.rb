class CreateParticipations < ActiveRecord::Migration[7.2]
  def change
    create_table :participations do |t|
      t.integer :user_id
      t.integer :challenge_id
      t.string :status

      t.datetime :joined_at
      t.timestamps
    end
  end
end
