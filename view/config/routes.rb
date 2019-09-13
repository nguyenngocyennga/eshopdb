Rails.application.routes.draw do
  get 'eshop/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'eshop#index'
end
