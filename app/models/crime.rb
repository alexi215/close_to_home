class Crime < ActiveRecord::Base

  # validates :latitude, :longitude, :allow_blank => false, :allow_nil => false
  validates_uniqueness_of :date, scope: [:address, :offense]

  geocoded_by :address
  # after_validation :geocode, on: :create
  after_validation :geocode, :if => :address_not_converted

  def address_not_converted
    Crime.all do |crime|
      crime[:latitude] == nil && crime[:longitude] == nil
    end
    crimes.select(&:persisted?)
  end

end # END of class


# In 'rails c' use Crime.delete_all to empty table
# Or 'rails c --sandbox' if you want to just mess around
