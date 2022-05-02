class UsersController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def index
    users = User.all
    render json: { users: users }
  end

  def show
    render json: { user: session_user }
  end

  def create
    user = User.new(user_params)

    if user.save
      payload = {user_id: user.id}
      payload['exp'] = 24.hours.from_now.to_i
      token = encode_token(payload)
      render json: { user: user, jwt: token }
    else
      render json: { error: "Invalid. Please try again."}, status: :unprocessable_entity
    end
  end


  private
    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:email, :name, :password, :phone_number)
    end
end
