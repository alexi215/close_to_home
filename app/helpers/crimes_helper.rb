module CrimesHelper

  def crime_data
    response = HTTParty.get('http://data.octo.dc.gov/feeds/crime_incidents/crime_incidents_current.xml')
    data = response.parsed_response
    crimes = data['feed']['entry']
    crimes.map do |crime|
      Crime.create(
        :date => crime['content']['ReportedCrime']['reportdatetime'], 
        :address => crime['content']['ReportedCrime']['blocksiteaddress'],
        :offense => crime['content']['ReportedCrime']['offense'],
        :method => crime['content']['ReportedCrime']['method'],
        :ward => crime['content']['ReportedCrime']['ward']
      )      
    end
  end
end # END of crimes module
