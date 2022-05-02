class AuthenticationController < ApplicationController
  skip_before_action :require_login, only: [:login, :auto_login]

  def login
    puts authentication_params
    user = User.find_by(email: authentication_params[:email])
    if user && user.authenticate(authentication_params[:password])
        render json: { user: user, remember: authentication_params[:remember], path: "one_time_pass" }
    else
        render json: {failure: "Log in failed! Username or password invalid!"}
    end
  end

  def auto_login
    if session_user
      render json: session_user
    else
      render json: {errors: "No User Logged In"}
    end
  end

  def user_is_authed
    render json: {message: "You are authorized"}
  end

  private
  # Only allow a list of trusted parameters through.
  def authentication_params
    params.require(:authentication).permit(:email, :password, :remember)
  end
end