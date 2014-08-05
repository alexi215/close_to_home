class CrimesController < ApplicationController

  def index
    # if (crime_data.first[:date] != Crime.all.last[:date])
    #   @crimes = crime_data
    #     respond_to do |format|
    #       # format.html { render :index }
    #       format.json { render json: @crimes }
    #     end
    #   else
        @crimes = Crime.all
        render json: @crimes
    # end
  end

  def new
  end

  def create
    @crimes = Crime.new
    if @crimes.save
      render json: @crimes
    else
      render status: 400, nothing: true
    end
  end
end # END of crimes controller
