class CrimesController < ApplicationController



  class Crimes
    include HTTParty
    format :xml
  end


  puts Crimes.get('http://data.octo.dc.gov/feeds/crime_incidents/crime_incidents_current.xml')

  # response = HTTParty.get('http://data.octo.dc.gov/feeds/crime_incidents/crime_incidents_current.xml')
  # # Hash of get request
  # data = response.parsed_response
  # # crimes array
  # crimes = data['feed']['entry']

  # xcoord = data['feed']['entry'][0]['content']['ReportedCrime']['blockxcoord']
  # ycoord = data['feed']['entry'][0]['content']['ReportedCrime']['blockycoord']
  # address = data['feed']['entry'][0]['content']['ReportedCrime']['blocksiteaddress']


end
