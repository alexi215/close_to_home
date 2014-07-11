Rails.application.routes.draw do

  root 'welcome#index'

  resources :users, except: [:index]
  resources :sessions, only: [:create]

  get '/singup' => 'sessions#new'
  get '/signin' => 'sessions#destroy'
  delete '/signout' => 'sessions#destroy'
  
end
