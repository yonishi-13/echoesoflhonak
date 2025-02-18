from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)  # Initialize SocketIO

@app.route('/get-model', methods=['POST'])
def get_model():
    data = request.get_json()  # Get the JSON data from the request
    risk_level = data.get('Risk level')  # Get the risk level (which is sent in the payload)
    
    # Handle the received risk level as needed
    print(f"Received Risk level: {risk_level}")
    
    # Emit this risk level to all connected clients
    socketio.emit('warning_update', {'predicted_class': risk_level})

    # Return the received risk level in the response
    return jsonify({"status": "success", "received_risk_level": risk_level})

# Socket.IO event to handle connection
@socketio.on('connect')
def handle_connect():
    print("Client connected")

# Socket.IO event to handle disconnection
@socketio.on('disconnect')
def handle_disconnect():
    print("Client disconnected")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)  # Run the app on port 5002
    socketio.run(app, host='0.0.0.0', port=5002)  # Start SocketIO on the same port
