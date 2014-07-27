class CrimesController < ApplicationController

  def index
    @crimes = extract_crimes
      respond_to do |format|
      # format.html { render :index }
      format.json { render json: @crimes }
    end
  end

end # END of crimes controller
