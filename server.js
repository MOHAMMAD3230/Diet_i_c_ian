require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const USDA_API_KEY = process.env.USDA_API_KEY;

app.use(cors());
app.use(express.json());

// API route for nutrition data search
app.post('/api/nutrition', async (req, res) => {
  const { foodName } = req.body || {};
  if (!foodName) return res.status(400).json({ error: 'Missing foodName' });

  try {
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        api_key: USDA_API_KEY,
        query: foodName,
        pageSize: 1
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
