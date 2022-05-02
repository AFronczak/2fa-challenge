Rails.application.routes.draw do

  get 'me', to: 'users#show'
  resources :users, only: [:create, :index]
  post '/otp', to: 'otp#verify'
  post '/login', to: 'authentication#login'
  get '/auto_login', to: 'authentication#auto_login'
  get '/user_is_authed', to: 'authentication#user_is_authed'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
