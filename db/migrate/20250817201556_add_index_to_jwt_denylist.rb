class AddIndexToJwtDenylist < ActiveRecord::Migration[7.2]
  def change
    add_index :jwt_denylists, :jti
  end
end
