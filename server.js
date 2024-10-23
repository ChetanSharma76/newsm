const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const API_KEY = 'b83355570fc040d586ffb0423c66a18b';

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for API call
app.get('/api/news', async (req, res) => {
  const query = req.query.q || 'latest';
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
