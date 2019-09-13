class EshopController < ApplicationController
  def index
    # render :text => 'hahaha'
    # return 'Hello world!'
    # @data = File.read("/.")
    # render :json => data,
    render :file => 'public/europe.json', :content_type => 'application/json', :layout => false
  end
end
