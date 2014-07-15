class Location < ActiveRecord::Base
  belongs_to :user

  validates :lat, presence: true
  validates :lng, presence: true
end
