class Crime < ActiveRecord::Base

  # validates :latitude, :longitude, :allow_blank => false, :allow_nil => false
  validates_uniqueness_of :date, scope: [:address, :offense]
  geocoded_by :address
  # after_validation :geocode, :if => :address_not_converted?
  # after_validation check for presence of lat/long, then geocode
  after_validation :geocode, on: :create

binding.pry
  # def address_not_converted?
  #   Crime.all do |crime|
  #     if (crime[:latitude] === nil || crime[:longitude] === nil)
  #       return true
  #     end
  #   end
  # end

end # END of class

# In 'rails c' use Crime.delete_all to empty table
# Or 'rails c --sandbox' if you want to just mess around
