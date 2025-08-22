class ChangeIntensityDefaultsInExercises < ActiveRecord::Migration[7.2]
  def change
    change_column_default :exercises, :intensity, "N/A"
  end
end
