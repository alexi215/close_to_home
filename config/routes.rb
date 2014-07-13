Rails.application.routes.draw do
  root 'welcome#index'

  resources :users, except: [:index] do
    # resources :locations, only: [:new, :create]
  end

  resources :sessions, only: [:create]
  get '/signup' => 'users#new'
  get '/signin' => 'sessions#new'
  delete '/signout' => 'sessions#destroy'
end
