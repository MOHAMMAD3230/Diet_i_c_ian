require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const USDA_API_KEY = process.env.USDA_API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  try {
    const { conversation } = req.body;

    const openaiRes = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4-0613',
      messages: conversation,
      temperature: 0.7,
      max_tokens: 400,
      functions: [
        {
          name: "fetchNutrition",
          description: "Get nutrition info for a food item",
          parameters: {
            type: "object",
            properties: {
              food: { type: "string", description: "Food name" }
            },
            required: ["food"]
          }
        }
      ],
      function_call: 'auto'
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const message = openaiRes.data.choices[0].message;

    if (message.function_call) {
      const args = JSON.parse(message.function_call.arguments);
      const food = args.food;

      const usdaRes = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
        params: {
          api_key: USDA_API_KEY,
          query: food,
          pageSize: 1
        }
      });

      let nutritionInfo = `No nutrition info found for "${food}".`;
      if(usdaRes.data.foods && usdaRes.data.foods.length > 0) {
        const item = usdaRes.data.foods[0];
        const nutrients = {};
        item.foodNutrients.forEach(n => {
          if(n.nutrientName === 'Energy' && n.unitName === 'KCAL') nutrients.calories = n.value;
          if(n.nutrientName === 'Protein' && n.unitName === 'G') nutrients.protein = n.value;
          if((n.nutrientName === 'Total lipid (fat)' || n.nutrientName === 'Fat') && n.unitName === 'G') nutrients.fat = n.value;
          if((n.nutrientName === 'Carbohydrate, by difference' || n.nutrientName === 'Carbohydrate') && n.unitName === 'G') nutrients.carbs = n.value;
        });
        nutritionInfo = `Nutrition info for "${item.description}":\n`;
        if(nutrients.calories !== undefined) nutritionInfo += `Calories: ${nutrients.calories} kcal\n`;
        if(nutrients.protein !== undefined) nutritionInfo += `Protein: ${nutrients.protein} g\n`;
        if(nutrients.fat !== undefined) nutritionInfo += `Fat: ${nutrients.fat} g\n`;
        if(nutrients.carbs !== undefined) nutritionInfo += `Carbohydrates: ${nutrients.carbs} g\n`;
      }

      return res.json({ reply: nutritionInfo, function_call: true });
    }

    res.json({ reply: message.content, function_call: false });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ reply: 'Server error occurred.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
