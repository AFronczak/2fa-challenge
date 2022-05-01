class OtpController < ApplicationController
  def verify
    code = session_params[:code]

    if code == '1111'
      session[:user_id] = session_params[:user_id]
      render json: {}, status: 200
    else
      render json: { error: "Invalid. Please try again."}, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def session_params
      params.require(:session).permit(:code, :user_id)
    end
end
