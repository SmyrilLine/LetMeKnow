const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to receive POST requests with error logs
app.post('/api/letmeknow', (req, res) => {
  console.log('Received error log:', req.body);
  res.status(200).json({ status: 'ok' });
});

// Start the server
app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
