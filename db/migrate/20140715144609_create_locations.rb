class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string  "label"
      t.string  "address", null: false
      t.integer "radius"
      t.decimal "lat", precision: 10, scale: 6
      t.decimal "lng", precision: 10, scale: 6
      t.integer "user_id"
    end
  end
end


