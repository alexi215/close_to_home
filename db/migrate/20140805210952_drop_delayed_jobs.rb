class DropDelayedJobs < ActiveRecord::Migration
  def change
    drop_table :delayed_jobs
    drop_table :column_for_crimes
  end
end
