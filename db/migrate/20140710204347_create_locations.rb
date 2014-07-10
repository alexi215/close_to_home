class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :label
      t.string :address, null: false
      t.integer :radius, :float, default: '.25'
      t.string :lat, :decimal
      t.string :long, :decimal
    end
  end
end
