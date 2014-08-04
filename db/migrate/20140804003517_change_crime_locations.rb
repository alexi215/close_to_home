class ChangeCrimeLocations < ActiveRecord::Migration
  def change
    rename_table :crime_locations, :crimes
  end
end
