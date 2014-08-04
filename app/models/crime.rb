class Crime < ActiveRecord::Base

  validates_uniqueness_of :date, scope: [:address, :offense]
  
  geocoded_by :address
  after_validation :geocode

end # END of class
