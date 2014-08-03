class CreateCrimeLocations < ActiveRecord::Migration
  def change
    create_table :crime_locations do |t|
      t.datetime "date"
      t.string "address"
      t.string "offense"
      t.string "method"
      t.integer "ward"
    end
  end
end
