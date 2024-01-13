# flask-api/app.py

from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/hello')
def hello():
    return jsonify(message='Hello from Flask API!')

if __name__ == '__main__':
    app.run(debug=True)
