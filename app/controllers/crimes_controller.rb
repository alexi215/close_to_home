class CrimesController < ApplicationController

  def extract
    response = HTTParty.get('http://data.octo.dc.gov/feeds/crime_incidents/crime_incidents_current.xml')
    # Hash of get request
    data = response.parsed_response
    # Extracting hash to create array of recent crimes
    crimes_array = data['feed']['entry']
    return crimes_array.to_json
  end

end # END of crimes controller
