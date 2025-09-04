class Api::V1::MealsController < ApplicationController
  before_action :set_meal, only: [:show, :update, :destroy]

  def index
    @meals = current_user.meals.order(meal_date: :desc).limit(30)
    render json: @meals.as_json(
      methods: [:total_calories, :total_carbs, :total_protein, :total_fat,
                :calorie_progress, :carbs_progress, :protein_progress, :fat_progress],
      include: {
        food_items: {
          only: [:id, :food_name, :meal_time, :quantity, :unit, :calories, :carbs, :protein, :fat, :created_at]
        }
      }
    )
  end

  # SHOW
  def show
    render json: @meal.as_json(
      methods: [:total_calories, :total_carbs, :total_protein, :total_fat,
                :calorie_progress, :carbs_progress, :protein_progress, :fat_progress,
                :breakfast_calories, :lunch_calories, :snacks_calories, :dinner_calories],
      include: {
        food_items: {
          only: [:id, :food_name, :meal_time, :quantity, :unit, :calories, :carbs, :protein, :fat, :created_at]
        }
      }
    )
  end

  # CREATE
  def create
    meal_date = Date.parse(params[:meal_date]) rescue Date.current
    @meal = current_user.meals.find_or_create_by(meal_date: meal_date) do |meal|
      meal.daily_calorie_goal = current_user.daily_calorie_intake || 2000
      meal.daily_carbs_goal = 250
      meal.daily_protein_goal = 150
      meal.daily_fat_goal = 80
    end

    if @meal.persisted?
      render json: @meal.as_json(
        methods: [:total_calories, :total_carbs, :total_protein, :total_fat],
        include: { food_items: { only: [:id, :food_name, :meal_time, :quantity, :unit, :calories] } }
      ), status: :ok
    else
      render json: { errors: @meal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # UPDATE
  def update
    if @meal.update(meal_params)
      render json: @meal.as_json(methods: [:total_calories, :calorie_progress])
    else
      render json: { errors: @meal.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DESTROY
  def destroy
    @meal.destroy
    render json: { message: "Meal log deleted" }
  end

  def today
    @meal = current_user.todays_meal
    render json: @meal.as_json(
      methods: [:total_calories, :total_carbs, :total_protein, :total_fat,
                :calorie_progress, :carbs_progress, :protein_progress, :fat_progress,
                :breakfast_calories, :lunch_calories, :snacks_calories, :dinner_calories],
      include: {
        food_items: {
          only: [:id, :food_name, :meal_time, :quantity, :unit, :calories, :carbs, :protein, :fat, :created_at]
        }
      }
    )
  end

  def summary
    period = params[:period]&.to_sym || :week
    
    case period
    when :week
      start_date = 1.week.ago.to_date
    when :month
      start_date = 1.month.ago.to_date
    else
      start_date = 1.week.ago.to_date
    end

    meals = current_user.meals.where(meal_date: start_date..Date.current).order(:meal_date)
    
    summary_data = meals.map do |meal|
      {
        date: meal.meal_date,
        total_calories: meal.total_calories,
        total_carbs: meal.total_carbs,
        total_protein: meal.total_protein,
        total_fat: meal.total_fat,
        calorie_goal: meal.daily_calorie_goal,
        calorie_progress: meal.calorie_progress,
        goal_met: meal.calorie_goal_met?
      }
    end

    render json: {
      period: period,
      summary: summary_data,
      average_calories: summary_data.sum { |day| day[:total_calories] } / summary_data.size.to_f
    }
  end

  private

  def set_meal
    @meal = current_user.meals.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'Meal not found' }, status: :not_found
  end

  def meal_params
    params.require(:meal).permit(:meal_date, :daily_calorie_goal, :daily_carbs_goal, 
                                 :daily_protein_goal, :daily_fat_goal)
  end
end