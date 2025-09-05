import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants/Constants';
import './MealsList.css';

function MealsList() {
  const [meals, setMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddFood, setShowAddFood] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/meals`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMeals(data);
        setError('');
      } else {
        setError('Failed to load meals');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  const createMeal = async () => {
    try {
      const response = await fetch(`${API_URL}/meals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meal_date: selectedDate
        })
      });

      if (response.ok) {
        const newMeal = await response.json();
        setSelectedMeal(newMeal);
        setShowAddFood(true);
        await loadMeals();
      }
    } catch (err) {
      setError('Failed to create meal');
    }
  };

  const getTodaysMeal = async () => {
    try {
      const response = await fetch(`${API_URL}/meals/today`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const meal = await response.json();
        setSelectedMeal(meal);
        setShowAddFood(true);
      }
    } catch (err) {
      setError('Failed to load today\'s meal');
    }
  };

  if (loading) return <div className="loading">Loading meals...</div>;

  return (
    <div className="meals-container">
      <h1 className="meals-title">Meal Tracker</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="meals-controls">
        <button 
          onClick={getTodaysMeal}
          className="btn-primary"
        >
          Today's Meal
        </button>
        
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />
        
        <button 
          onClick={createMeal}
          className="btn-secondary"
        >
          Create Meal
        </button>
      </div>

      {showAddFood && selectedMeal && (
        <AddFoodModal 
          meal={selectedMeal} 
          onClose={() => {
            setShowAddFood(false);
            loadMeals();
          }}
        />
      )}

      <div className="meals-grid">
        {meals.map(meal => (
          <MealCard key={meal.id} meal={meal} onSelect={() => {
            setSelectedMeal(meal);
            setShowAddFood(true);
          }} />
        ))}
      </div>
    </div>
  );
}

// Meal Card Component
function MealCard({ meal, onSelect }) {
  const getProgressBarClass = (progress) => {
    if (progress > 100) return 'danger';
    if (progress > 90) return 'warning';
    return 'success';
  };

  return (
    <div 
      onClick={onSelect}
      className="meal-card"
    >
      <h3 className="meal-date">{new Date(meal.meal_date).toLocaleDateString()}</h3>
      
      <div className="progress-section">
        <div className="progress-item">
          <div className="progress-header">
            <span className="progress-label">Calories</span>
            <span className="progress-values">{meal.total_calories} / {meal.daily_calorie_goal}</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className={`progress-bar ${getProgressBarClass(meal.calorie_progress)}`}
              style={{ width: `${Math.min(meal.calorie_progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="macros-grid">
          <div className="macro-item">
            <div className="macro-label">Carbs</div>
            <div className="macro-value">{meal.total_carbs}g</div>
          </div>
          <div className="macro-item">
            <div className="macro-label">Protein</div>
            <div className="macro-value">{meal.total_protein}g</div>
          </div>
          <div className="macro-item">
            <div className="macro-label">Fat</div>
            <div className="macro-value">{meal.total_fat}g</div>
          </div>
        </div>
      </div>

      <div className="items-count">
        {meal.food_items?.length || 0} items logged
      </div>
    </div>
  );
}

// Add Food Modal Component
function AddFoodModal({ meal, onClose }) {
  const [foodQuery, setFoodQuery] = useState('');
  const [mealTime, setMealTime] = useState('breakfast');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('serving');
  const [nutritionData, setNutritionData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [error, setError] = useState('');
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadFoodItems();
  }, [meal.id]);

  const loadFoodItems = async () => {
    try {
      const response = await fetch(`${API_URL}/meals/${meal.id}/food_items`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const items = await response.json();
        setFoodItems(items);
      }
    } catch (err) {
      console.error('Failed to load food items');
    }
  };

  const searchNutrition = async () => {
    if (!foodQuery) return;
    
    setSearching(true);
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/search_nutrition`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${quantity} ${unit} ${foodQuery}`
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setNutritionData(data.food);
      } else {
        setError(data.message || 'No nutrition data found');
        setNutritionData(null);
      }
    } catch (err) {
      setError('Failed to search nutrition data');
    }
    setSearching(false);
  };

  const addFoodItem = async () => {
    if (!nutritionData) return;

    try {
      const response = await fetch(`${API_URL}/meals/${meal.id}/food_items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          food_item: {
            food_name: nutritionData.name,
            meal_time: mealTime,
            quantity: quantity,
            unit: unit,
            calories: nutritionData.calories,
            carbs: nutritionData.carbs,
            protein: nutritionData.protein,
            fat: nutritionData.fat
          }
        })
      });

      if (response.ok) {
        setFoodQuery('');
        setNutritionData(null);
        setQuantity(1);
        await loadFoodItems();
      }
    } catch (err) {
      setError('Failed to add food item');
    }
  };

  const deleteFoodItem = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/meals/${meal.id}/food_items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        await loadFoodItems();
      }
    } catch (err) {
      console.error('Failed to delete item');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Meal for {new Date(meal.meal_date).toLocaleDateString()}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        {/* Search Section */}
        <div className="add-food-section">
          <h3 className="add-food-title">Add Food Item</h3>
          
          <div className="form-grid">
            <select 
              value={mealTime} 
              onChange={(e) => setMealTime(e.target.value)}
              className="form-select"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="snacks">Snacks</option>
              <option value="dinner">Dinner</option>
            </select>

            <div className="quantity-unit-group">
              <input 
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Qty"
                className="form-input quantity-input"
              />
              <input 
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Unit"
                className="form-input unit-input"
              />
            </div>
          </div>

          <div className="search-group">
            <input 
              type="text"
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchNutrition()}
              placeholder="Enter food name (e.g., chicken breast, apple)"
              className="form-input search-input"
            />
            <button 
              onClick={searchNutrition}
              disabled={searching}
              className="btn-search"
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          {nutritionData && (
            <div className="nutrition-result">
              <h4 className="nutrition-title">{nutritionData.name}</h4>
              <div className="nutrition-grid">
                <div className="nutrition-item">Calories: {nutritionData.calories}</div>
                <div className="nutrition-item">Carbs: {nutritionData.carbs}g</div>
                <div className="nutrition-item">Protein: {nutritionData.protein}g</div>
                <div className="nutrition-item">Fat: {nutritionData.fat}g</div>
              </div>
              <button 
                onClick={addFoodItem}
                className="btn-add"
              >
                Add to Meal
              </button>
            </div>
          )}
        </div>

        {/* Food Items List */}
        <div className="food-items-section">
          <h3 className="section-title">Food Items</h3>
          {['breakfast', 'lunch', 'snacks', 'dinner'].map(time => {
            const items = foodItems.filter(item => item.meal_time === time);
            if (items.length === 0) return null;
            
            return (
              <div key={time} className="meal-time-section">
                <h4 className="meal-time-title">{time}</h4>
                {items.map(item => (
                  <div key={item.id} className="food-item">
                    <div className="food-item-info">
                      <div className="food-item-name">{item.food_name}</div>
                      <div className="food-item-details">({item.quantity} {item.unit})</div>
                    </div>
                    <div className="food-item-actions">
                      <span className="food-item-calories">{item.calories} cal</span>
                      <button 
                        onClick={() => deleteFoodItem(item.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="daily-summary">
          <h3 className="summary-title">Daily Summary</h3>
          <div className="summary-grid">
            <div>
              <div className="summary-item">
                <span>Calories:</span>
                <span className="summary-value">{meal.total_calories} / {meal.daily_calorie_goal}</span>
              </div>
              <div className="summary-item">
                <span>Carbs:</span>
                <span className="summary-value">{meal.total_carbs}g / {meal.daily_carbs_goal}g</span>
              </div>
            </div>
            <div>
              <div className="summary-item">
                <span>Protein:</span>
                <span className="summary-value">{meal.total_protein}g / {meal.daily_protein_goal}g</span>
              </div>
              <div className="summary-item">
                <span>Fat:</span>
                <span className="summary-value">{meal.total_fat}g / {meal.daily_fat_goal}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealsList;