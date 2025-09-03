class CreateChallenges < ActiveRecord::Migration[7.2]
  def change
    create_table :challenges do |t|
      t.string :name
      t.text :description
      t.integer :duration_minutes, comment: 'Duration in minutes'
      t.integer :value
      t.string :unit
      t.references :challengeable, polymorphic: true, null: true

      t.timestamps
    end
  end
end
