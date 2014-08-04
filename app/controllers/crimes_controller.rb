class CrimesController < ApplicationController

  def index
<<<<<<< HEAD
    @crimes = extract_crimes
=======
    @crimes = crimes
>>>>>>> crimes
      respond_to do |format|
      # format.html { render :index }
      format.json { render json: @crimes }
    end
  end

<<<<<<< HEAD
=======
  def create
    @crimes = Crime.new
    if @crimes.save
      render json: @crimes
    else
      render status: 400, nothing: true
    end
  end
>>>>>>> crimes
end # END of crimes controller
