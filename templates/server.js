const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./sensor_data.db');

// API Endpoint to fetch sensor data
app.get('/api/sensor-data', (req, res) => {
  db.all('SELECT * FROM sensor_readings ORDER BY timestamp DESC LIMIT 1', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows[0]); // Send the most recent data
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
