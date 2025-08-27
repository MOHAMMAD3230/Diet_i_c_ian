import React, { useState } from 'react';

function App() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [diet, setDiet] = useState('');
  const [bmiMsg, setBmiMsg] = useState('');
  const [foodInput, setFoodInput] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState('');

  const calculateBMI = (w, h) => {
    const heightM = h / 100;
    return +(w / (heightM * heightM)).toFixed(1);
  };

  const bmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const generateAdvice = (bmi, diet) => {
    let advice = `Your BMI is ${bmi} (${bmiCategory(bmi)}).\n`;
    switch (bmiCategory(bmi)) {
      case 'Underweight':
        advice += 'Consider calorie-rich, nutrient-dense foods.\n';
        break;
      case 'Normal weight':
        advice += 'Maintain balanced diet and exercise.\n';
        break;
      case 'Overweight':
        advice += 'Monitor calories and increase activity.\n';
        break;
      case 'Obese':
        advice += 'Seek medical counsel for management.\n';
        break;
      default:
        advice += '';
    }
    if(diet) advice += `Your diet preference is ${diet}. Tailor nutrients accordingly.`;
    return advice;
  };

  const handleBMICalc = () => {
    if (!weight || !height) {
      setBmiMsg('Please enter valid weight and height.');
      return;
    }
    const bmi = calculateBMI(Number(weight), Number(height));
    setBmiMsg(generateAdvice(bmi, diet));
  };

  const fetchNutritionData = async () => {
    if (!foodInput) return;
    try {
      const res = await fetch('/api/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName: foodInput }),
      });
      const data = await res.json();

      if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];
        const nutrients = {};
        food.foodNutrients.forEach(n => {
          const name = n.nutrientName.toLowerCase();
          if (name.includes('energy')) nutrients.calories = n.value;
          if (name.includes('protein')) nutrients.protein = n.value;
          if (name.includes('fat')) nutrients.fat = n.value;
          if (name.includes('carbohydrate')) nutrients.carbs = n.value;
        });
        setNutritionInfo(`${food.description} Nutrition: Calories: ${nutrients.calories || 'N/A'} kcal, Protein: ${nutrients.protein || 'N/A'} g, Fat: ${nutrients.fat || 'N/A'} g, Carbs: ${nutrients.carbs || 'N/A'} g`);
      } else {
        setNutritionInfo('No nutrition data found.');
      }
    } catch {
      setNutritionInfo('Error fetching nutrition data.');
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>Dietician AI</h2>
      <input placeholder="Age" value={age} type="number" onChange={e => setAge(e.target.value)} />
      <input placeholder="Weight (kg)" value={weight} type="number" onChange={e => setWeight(e.target.value)} />
      <input placeholder="Height (cm)" value={height} type="number" onChange={e => setHeight(e.target.value)} />
      <input placeholder="Diet Preference" value={diet} type="text" onChange={e => setDiet(e.target.value)} />
      <button onClick={handleBMICalc}>Calculate BMI & Advice</button>
      <p>{bmiMsg}</p>

      <hr style={{ margin: '20px 0' }} />

      <input placeholder="Enter food name" value={foodInput} onChange={e => setFoodInput(e.target.value)} />
      <button onClick={fetchNutritionData}>Get Nutrition</button>
      <pre>{nutritionInfo}</pre>
    </div>
  );
}

export default App;
