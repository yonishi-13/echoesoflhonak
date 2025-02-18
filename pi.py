import pickle
import numpy as np
import threading
import serial
import logging
from flask import Flask, render_template, jsonify
from flask_cors import CORS
import pandas as pd

# Flask App
app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load the model
with open('flood_risk_model.pkl', 'rb') as f:
    model = pickle.load(f)

def predict_flood_risk(wind_speed):
    # Prepare input with feature name to match training data
    input_data = pd.DataFrame([[wind_speed]], columns=['wind_speed'])
    
    # Predict risk
    risk_category = model.predict(input_data)[0]
    
    # Decode risk
    risk_mapping = {0: 'Safe', 1: 'Moderate Flood Risk', 2: 'Flood Risk'}
    risk_message = risk_mapping[risk_category]
    
    return risk_category, risk_message

# Function to safely convert string to float
def safe_float(value):
    try:
        return float(value)
    except ValueError:
        logging.warning(f"Could not convert value to float: {value}")
        return None

# Serial Data Reading Function
def read_serial_data():
    try:
        ser = serial.Serial('COM9', 115200, timeout=1)
        logging.info("Simulating serial connection")
        while True:
            line = ser.readline().decode('utf-8').strip()
            line = ''.join(c for c in line if c.isalnum() or c in {',', '.'})
            logging.debug(f"Cleaned Serial Data: {line}")
            values = line.split(",")
            if len(values) == 6:
                data = {
                    "temperature": safe_float(values[0]),
                    "humidity": safe_float(values[1]),
                    "pressure": safe_float(values[2]),
                    "altitude": safe_float(values[3]),
                    "wind_speed": safe_float(values[4]),
                    "wind_direction": values[5]
                }
                return data
    except Exception as e:
        logging.error(f"Error reading serial data: {e}")
        return None

@app.route("/weather-data")
def weather_data():
    data = read_serial_data()
    if data:
        wind_speed = data.get("wind_speed")
        if wind_speed is not None:
            risk_category, risk_message = predict_flood_risk(wind_speed)
            # Convert numpy types to Python native types
            data["risk_level"] = int(risk_category)  # Convert numpy.int64 to int
            data["risk_message"] = risk_message
        return jsonify(data)  # Flask will serialize native Python types to JSON
    else:
        return jsonify({"error": "Failed to fetch data"}), 500
if __name__ == "__main__":
    app.run(debug=True)


