import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants/Constants';

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

  if (loading) return <div>Loading meals...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Meal Tracker</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={getTodaysMeal}
          style={{ padding: '10px 20px', backgroundColor: '#22C55E', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Today's Meal
        </button>
        
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        
        <button 
          onClick={createMeal}
          style={{ padding: '10px 20px', backgroundColor: '#3B82F6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Create Meal for Date
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
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
  const progressBarStyle = (progress) => ({
    width: `${Math.min(progress, 100)}%`,
    height: '20px',
    backgroundColor: progress > 100 ? '#EF4444' : '#22C55E',
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  });

  return (
    <div 
      onClick={onSelect}
      style={{ 
        padding: '20px', 
        border: '1px solid #e5e5e5', 
        borderRadius: '10px', 
        backgroundColor: 'white',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <h3>{new Date(meal.meal_date).toLocaleDateString()}</h3>
      
      <div style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>Calories</span>
            <span>{meal.total_calories} / {meal.daily_calorie_goal}</span>
          </div>
          <div style={{ backgroundColor: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={progressBarStyle(meal.calorie_progress)}></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '15px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>Carbs</div>
            <div style={{ fontWeight: 'bold' }}>{meal.total_carbs}g</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>Protein</div>
            <div style={{ fontWeight: 'bold' }}>{meal.total_protein}g</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#666' }}>Fat</div>
            <div style={{ fontWeight: 'bold' }}>{meal.total_fat}g</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>Meal for {new Date(meal.meal_date).toLocaleDateString()}</h2>
          <button onClick={onClose} style={{ fontSize: '24px', border: 'none', background: 'none', cursor: 'pointer' }}>×</button>
        </div>

        {/* Search Section */}
        <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
          <h3>Add Food Item</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <select 
              value={mealTime} 
              onChange={(e) => setMealTime(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="snacks">Snacks</option>
              <option value="dinner">Dinner</option>
            </select>

            <div style={{ display: 'flex', gap: '5px' }}>
              <input 
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Qty"
                style={{ width: '80px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <input 
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="Unit"
                style={{ width: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text"
              value={foodQuery}
              onChange={(e) => setFoodQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchNutrition()}
              placeholder="Enter food name (e.g., chicken breast, apple)"
              style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <button 
              onClick={searchNutrition}
              disabled={searching}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#3B82F6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px',
                cursor: searching ? 'wait' : 'pointer'
              }}
            >
              {searching ? 'Searching...' : 'Search'}
            </button>
          </div>

          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          
          {nutritionData && (
            <div style={{ marginTop: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #ddd' }}>
              <h4>{nutritionData.name}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
                <div>Calories: {nutritionData.calories}</div>
                <div>Carbs: {nutritionData.carbs}g</div>
                <div>Protein: {nutritionData.protein}g</div>
                <div>Fat: {nutritionData.fat}g</div>
              </div>
              <button 
                onClick={addFoodItem}
                style={{ 
                  marginTop: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#22C55E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Add to Meal
              </button>
            </div>
          )}
        </div>

        {/* Food Items List */}
        <div>
          <h3>Food Items</h3>
          {['breakfast', 'lunch', 'snacks', 'dinner'].map(time => {
            const items = foodItems.filter(item => item.meal_time === time);
            if (items.length === 0) return null;
            
            return (
              <div key={time} style={{ marginBottom: '20px' }}>
                <h4 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{time}</h4>
                {items.map(item => (
                  <div key={item.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    marginBottom: '5px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px'
                  }}>
                    <div>
                      <strong>{item.food_name}</strong> ({item.quantity} {item.unit})
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <span>{item.calories} cal</span>
                      <button 
                        onClick={() => deleteFoodItem(item.id)}
                        style={{ 
                          padding: '5px 10px',
                          backgroundColor: '#EF4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
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
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '5px' }}>
          <h3>Daily Summary</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Calories:</span>
                <span>{meal.total_calories} / {meal.daily_calorie_goal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Carbs:</span>
                <span>{meal.total_carbs}g / {meal.daily_carbs_goal}g</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Protein:</span>
                <span>{meal.total_protein}g / {meal.daily_protein_goal}g</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Fat:</span>
                <span>{meal.total_fat}g / {meal.daily_fat_goal}g</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealsList;