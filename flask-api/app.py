from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://alembic:alembic_pass@localhost:5432/charge_data'

def get_db_connection():
    conn = psycopg2.connect(app.config['SQLALCHEMY_DATABASE_URI'])
    return conn

@app.route('/estates', methods=['GET'])
def get_estates():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM estates;')
    estates = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(estates)

if __name__ == '__main__':
    app.run(debug=True)
