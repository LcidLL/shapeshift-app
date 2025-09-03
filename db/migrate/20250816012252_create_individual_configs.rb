class CreateIndividualConfigs < ActiveRecord::Migration[7.2]
  def change
    create_table :individual_configs do |t|
      t.timestamps
    end
  end
end
