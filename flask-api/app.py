from flask import Flask, jsonify
from flask_cors import CORS
from models import db, Estates, Blocks, Charges
import psycopg2

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://alembic:alembic_pass@localhost:5432/charge_data'
db.init_app(app)

def get_db_connection():
    conn = psycopg2.connect(app.config['SQLALCHEMY_DATABASE_URI'])
    return conn

@app.route('/estates', methods=['GET'])
def get_estates():
    estates = Estates.query.all()
    estates_list = [{'ID': estate.ID, 'Estate_Name': estate.Estate_Name, 'Estate_RV': estate.Estate_RV} for estate in estates]
    return jsonify(estates_list)

@app.route('/blocks/<int:estate_id>', methods=['GET'])
def get_blocks(estate_id):
    blocks = Blocks.query.filter_by(Estate_ID=estate_id).all()
    blocks_list = [{'ID': block.ID, 'Block_Name': block.Block_Name, 'Block_RV': block.Block_RV, 'Estate_ID': block.Estate_ID} for block in blocks]
    return jsonify(blocks_list)

if __name__ == '__main__':
    app.run(debug=True)
