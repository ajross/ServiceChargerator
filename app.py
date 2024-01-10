from flask import Flask, jsonify, render_template, request
from models import db, Estates, Blocks, Charges

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://alembic:alembic_pass@localhost:5432/charge_data'
db.init_app(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/get_blocks/<int:estate_id>')
def get_blocks(estate_id):
    blocks = Blocks.query.filter_by(Estate_ID=estate_id).all()
    blocks_data = [{'ID': block.ID, 'Block_Name': block.Block_Name} for block in blocks]
    return jsonify({'blocks': blocks_data})


def your_query_function(estate_id, block_id):
    # Query relevant charge data based on selected estate and block IDs
    charges = Charges.query.filter_by(Estate_ID=estate_id, Block_ID=block_id).all()

    # Create a dictionary to organize charges by Year_End
    charges_by_year = {}

    for charge in charges:
        year_end = charge.Year_End

        if year_end not in charges_by_year:
            charges_by_year[year_end] = {'Year_End': year_end, 'charges': []}

        charge_data = {'Block_ID': charge.Block_ID,
                       'Estate_ID': charge.Estate_ID}
        # Add other charge columns starting with "Block"

        charges_by_year[year_end]['charges'].append(charge_data)

    # Sort the charges by Year_End
    sorted_charges = sorted(charges_by_year.values(), key=lambda x: x['Year_End'])

    return sorted_charges

@app.route('/block_charges', methods=['GET', 'POST'])
def block_charges():
    estates = Estates.query.all()

    if request.method == 'POST':
        estate_id = request.form.get('estate')
        block_id = request.form.get('block')

        # Query charges based on selected estate and block
        charges = your_query_function(estate_id, block_id)  # Replace with your actual query function

        return render_template('block_charges.html', estates=estates, charges=charges)

    return render_template('block_charges.html', estates=estates, charges=None)

@app.route('/premise_charges')
def premise_charges():
    return render_template('premise_charges.html')

@app.route('/block_charge_comparisons')
def block_charge_comparisons():
    return render_template('block_charge_comparisons.html')

@app.route('/premise_charge_comparisons')
def premise_charge_comparisons():
    return render_template('premise_charge_comparisons.html')

if __name__ == '__main__':
    app.run(debug=True)
