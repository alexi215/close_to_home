class CreateColumnForCrimes < ActiveRecord::Migration
  def change
    create_table :column_for_crimes do |t|
      t.string "db_time"
    end
  end
end
