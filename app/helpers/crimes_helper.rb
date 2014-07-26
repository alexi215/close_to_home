module CrimesHelper

  def extract_crimes
    response = HTTParty.get('http://data.octo.dc.gov/feeds/crime_incidents/crime_incidents_current.xml')
    # Hash of get request
    data = response.parsed_response
    # Extracting hash to create array of recent crimes
    crimes = data['feed']['entry']
    # return crimes_array.to_json
    crimes.map do |crime|
      Hash[
      :date => crime['content']['ReportedCrime']['reportdatetime'], 
      :address => crime['content']['ReportedCrime']['blocksiteaddress'],
      :offense => crime['content']['ReportedCrime']['offense'],
      :method => crime['content']['ReportedCrime']['method'],
      :ward => crime['content']['ReportedCrime']['ward']
    ]
    end
  end
  
end # END of crimes module
