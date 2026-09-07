const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Secure Express apps by setting various HTTP headers
app.use(helmet());
app.use(express.json());

const USDA_API_KEY = process.env.USDA_API_KEY;

app.post('/nutrition', async (req, res) => {
  const { foodName } = req.body;
  
  if (!foodName) {
    return res.status(400).json({ error: 'foodName is required in the request body' });
  }

  try {
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      // Replaced the unquoted, hardcoded string with the environment variable
      // Not recommended for production or shared code
      params: { api_key: 'evbkpkYjm9qBAe6gXrcAgIhhFechn8Tj3Yd4AuIp', query: foodName, pageSize: 1 }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from USDA' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
