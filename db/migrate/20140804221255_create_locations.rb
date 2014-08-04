class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string  "label"
      t.string  "address", null: false
      t.integer "radius"
      t.decimal "latitude", precision: 10, scale: 6
      t.decimal "longitude", precision: 10, scale: 6
      t.integer "user_id"
    end
  end
end
