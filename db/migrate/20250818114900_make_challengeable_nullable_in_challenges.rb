class MakeChallengeableNullableInChallenges < ActiveRecord::Migration[7.2]
  def change
    change_column_null :challenges, :challengeable_id, true
    change_column_null :challenges, :challengeable_type, true
  end
end
