class LocationsController < ApplicationController

  def index
    @user = current_user
    @locations = @user.locations
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @locations }
    end
  end

  def create
    binding.pry
    @location = Location.new(location_params)
    @location.user_id = params[:user_id]
    if @location.save
      render json: @location
    else
      render status: 400, nothing: true
    end
  end

private

  def location_params
    params.require(:location).permit(:label, :address, :radius, :lat, :lng, :user_id)
  end

end # END of controller 
