const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const axios = require('axios');
const app = express();
const port = 5002;

// Initialize SQLite database
const db = new sqlite3.Database('data.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to SQLite database');
});

db.run(`CREATE TABLE IF NOT EXISTS weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    temperature REAL,
    humidity REAL,
    pressure REAL,
    altitude REAL,
    wind_speed REAL,
    wind_direction TEXT
)`);

// Function to fetch and log data
const fetchAndLogData = async () => {
    try {
        const { data } = await axios.get('http://localhost:5000/weather-data');
        const { temperature, humidity, pressure, altitude, wind_speed, wind_direction } = data;
        db.run(`INSERT INTO weather_data (temperature, humidity, pressure, altitude, wind_speed, wind_direction) VALUES (?, ?, ?, ?, ?, ?)`, 
            [temperature, humidity, pressure, altitude, wind_speed, wind_direction]);
        console.log("Weather data logged to database");
    } catch (err) {
        console.error("Error fetching weather data:", err.message);
    }
};

// Fetch data every 10 seconds
setInterval(fetchAndLogData, 10000);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
