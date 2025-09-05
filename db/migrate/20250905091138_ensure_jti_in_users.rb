class EnsureJtiInUsers < ActiveRecord::Migration[7.2]
  def change
    unless column_exists?(:users, :jti)
      add_column :users, :jti, :string
      add_index :users, :jti, unique: true
    end
    
    User.find_each do |user|
      user.update_column(:jti, SecureRandom.uuid) if user.jti.blank?
    end
  end
end