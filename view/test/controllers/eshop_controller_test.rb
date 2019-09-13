require 'test_helper'

class EshopControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get eshop_index_url
    assert_response :success
  end

end
