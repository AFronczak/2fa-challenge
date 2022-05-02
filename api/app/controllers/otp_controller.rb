class OtpController < ApplicationController
  skip_before_action :require_login, only: [:verify]
  def verify
    if code_valid?
      payload = {user_id: user_id}
      payload['exp'] = remember_token_time

      token = encode_token(payload)
      render json: { jwt: token }, status: 200
    else
      render json: { error: "Invalid. Please try again." }, status: :unprocessable_entity
    end
  end

  private
  
  def session_params
    params.require(:otp).permit(:code, :user_id, :remember)
  end

  def user_id
    session_params[:user_id]
  end

  def code_valid?
    session_params[:code] == '1111'
  end

  def remember_token_time
    session_params[:remember] ? 7.days.from_now.to_i : 24.hours.from_now.to_i
  end
end
