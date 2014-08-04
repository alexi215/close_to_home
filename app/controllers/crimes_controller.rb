class CrimesController < ApplicationController

  def index
    @crimes = crimes
      respond_to do |format|
      # format.html { render :index }
      format.json { render json: @crimes }
    end
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
