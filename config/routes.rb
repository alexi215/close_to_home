Rails.application.routes.draw do
  root 'welcome#index'

  resources :users, except: [:index] do
    resources :locations
  end

  resources :sessions, only: [:create]
  get '/signup' => 'users#new'
  get '/signin' => 'sessions#new'
  delete '/signout' => 'sessions#destroy'

  resources :crimes, only: [:index]

end
