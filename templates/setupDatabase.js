const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./sensor_data.db');

db.serialize(() => {
  // Create table
  db.run(`
    CREATE TABLE IF NOT EXISTS sensor_readings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      temp REAL,
      accel_x REAL,
      accel_y REAL,
      accel_z REAL,
      gyro_x REAL,
      gyro_y REAL,
      gyro_z REAL,
      mag_x REAL,
      mag_y REAL,
      mag_z REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert sample data
  const stmt = db.prepare(`
    INSERT INTO sensor_readings (temp, accel_x, accel_y, accel_z, gyro_x, gyro_y, gyro_z, mag_x, mag_y, mag_z)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 0; i < 10; i++) {
    stmt.run(
      (Math.random() * 15 + 10).toFixed(2), // temp
      (Math.random() * 2 - 1).toFixed(2),   // accel_x
      (Math.random() * 2 - 1).toFixed(2),   // accel_y
      (Math.random() * 2 - 1).toFixed(2),   // accel_z
      (Math.random() * 2 - 1).toFixed(2),   // gyro_x
      (Math.random() * 2 - 1).toFixed(2),   // gyro_y
      (Math.random() * 2 - 1).toFixed(2),   // gyro_z
      (Math.random() * 50 - 25).toFixed(2), // mag_x
      (Math.random() * 50 - 25).toFixed(2), // mag_y
      (Math.random() * 50 - 25).toFixed(2)  // mag_z
    );
  }

  stmt.finalize();
});

db.close(() => {
  console.log('Database setup complete.');
});
