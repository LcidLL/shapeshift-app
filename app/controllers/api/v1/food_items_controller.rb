class Api::V1::FoodItemsController < ApplicationController
  before_action :set_meal
  before_action :set_food_item, only: [:show, :update, :destroy]

  def index
    @food_items = @meal.food_items.order(:meal_time, :created_at)
    render json: @food_items
  end

  # SHOW
  def show
    render json: @food_item
  end

  # CREATE
  def create
    @food_item = @meal.food_items.build(food_item_params)

    if @food_item.save
      render json: @food_item, status: :created
    else
      render json: { errors: @food_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # UPDATE
  def update
    if @food_item.update(food_item_params)
      render json: @food_item
    else
      render json: { errors: @food_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DESTROY
  def destroy
    @food_item.destroy
    render json: { message: "Food item deleted" }
  end

  def search_nutrition
    food_query = params[:query]
    
    if food_query.blank?
      render json: { errors: 'Food query is required' }, status: :bad_request
      return
    end

    result = CalorieNinjasApi.get_nutrition(food_query)
    
    if result[:success]
      render json: {
        success: true,
        food: {
          name: result[:data][:name],
          calories: result[:data][:calories],
          carbs: result[:data][:carbs],
          protein: result[:data][:protein],
          fat: result[:data][:fat],
          serving_size: result[:data][:serving_size],
          unit: result[:data][:unit]
        },
        query: food_query
      }
    else
      render json: {
        success: false,
        message: result[:message],
        suggestions: [
          "Try: '1 cup rice', '200g chicken breast', '1 medium apple'",
          "Include quantity and unit for better results",
          "Use common food names"
        ]
      }, status: :not_found
    end
  end

  private

  def set_meal
    if params[:meal_id]
      @meal = current_user.meals.find(params[:meal_id])
    else
      @meal = nil
    end
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'Meal not found' }, status: :not_found
  end

  def set_food_item
    @food_item = @meal.food_items.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'Food item not found' }, status: :not_found
  end

  def food_item_params
    params.require(:food_item).permit(:food_name, :meal_time, :quantity, :unit, 
                                      :calories, :carbs, :protein, :fat)
  end
end