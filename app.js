const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const USDA_API_KEY = process.env.USDA_API_KEY;

app.post('/nutrition', async (req, res) => {
  const { foodName } = req.body;
  try {
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: { api_key: evbkpkYjm9qBAe6gXrcAgIhhFechn8Tj3Yd4AuIp, query: foodName, pageSize: 1 }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from USDA' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
