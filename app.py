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


def charges_data_by_block(estate_id, block_id):
    # Query relevant charge data based on selected estate and block IDs
    charges = Charges.query.filter_by(Estate_ID=estate_id, Block_ID=block_id).all()

    # Create a dictionary to organize charges by Year_End
    charges_by_year = {}

    for charge in charges:
        year_end = charge.Year_End

        if year_end not in charges_by_year:
            charges_by_year[year_end] = {'Year_End': year_end, 'charges': {}}

        charge_data = {'Block_ID': charge.Block_ID,
                       'Estate_ID': charge.Estate_ID,
                       'Block_Boiler_Repairs_and_Maintenance': charge.Block_Boiler_Repairs_and_Maintenance,
                       'Block_Cleaning': charge.Block_Cleaning,
                       'Block_Communal_Electricity': charge.Block_Communal_Electricity,
                       'Block_Communal_Electrical_Maintenance': charge.Block_Communal_Electrical_Maintenance,
                       'Block_Communal_Ventilation_Maintenance': charge.Block_Communal_Ventilation_Maintenance,
                       'Block_Communal_Water_Quality': charge.Block_Communal_Water_Quality,
                       'Block_Communal_Window_Cleaning': charge.Block_Communal_Window_Cleaning,
                       'Block_Concierge': charge.Block_Concierge,
                       'Block_CCTV': charge.Block_CCTV,
                       'Block_Disinfestation': charge.Block_Disinfestation,
                       'Block_Door_Entry_System': charge.Block_Door_Entry_System,
                       'Block_Dry_Riser': charge.Block_Dry_Riser,
                       'Block_Lightning_Protection': charge.Block_Lightning_Protection,
                       'Block_Lift_Services_and_Repairs': charge.Block_Lift_Services_and_Repairs,
                       'Block_Fire_Ventilation_Maintenance': charge.Block_Fire_Ventilation_Maintenance,
                       'Block_Repairs_and_Maintenance': charge.Block_Repairs_and_Maintenance,
                       'Block_TV_Aerial': charge.Block_TV_Aerial,
                       'Block_Ext_Cleaning': charge.Block_Ext_Cleaning,
                       'Block_Ext_External_Tree_Maintenance': charge.Block_Ext_External_Tree_Maintenance,
                       'Block_Ext_Grounds_Maintenance': charge.Block_Ext_Grounds_Maintenance,
                       'Block_Ext_Repairs_and_Maintenance': charge.Block_Ext_Repairs_and_Maintenance,
                       'Estate_Cleaning': charge.Estate_Cleaning,
                       'Estate_CCTV': charge.Estate_CCTV,
                       'Estate_Communal_Electricity': charge.Estate_Communal_Electricity,
                       'Estate_Grounds_Maintenance': charge.Estate_Grounds_Maintenance,
                       'Estate_Repairs_and_Maintenance': charge.Estate_Repairs_and_Maintenance,
                       'Estate_Tree_Maintenance': charge.Estate_Repairs_and_Maintenance
                       }

        charges_by_year[year_end]['charges'] = charge_data

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
        charges = charges_data_by_block(estate_id, block_id)  # Replace with your actual query function
        
        charge_types = [
            "Block_Boiler_Repairs_and_Maintenance",
            "Block_Cleaning",
            "Block_Communal_Electricity",
            "Block_Communal_Electrical_Maintenance",
            "Block_Communal_Ventilation_Maintenance",
            "Block_Communal_Water_Quality",
            "Block_Communal_Window_Cleaning",
            "Block_Concierge",
            "Block_CCTV",
            "Block_Disinfestation",
            "Block_Door_Entry_System",
            "Block_Dry_Riser",
            "Block_Lightning_Protection",
            "Block_Lift_Services_and_Repairs",
            "Block_Fire_Ventilation_Maintenance",
            "Block_Repairs_and_Maintenance",
            "Block_TV_Aerial",
            "Block_Ext_Cleaning",
            "Block_Ext_External_Tree_Maintenance",
            "Block_Ext_Grounds_Maintenance",
            "Block_Ext_Repairs_and_Maintenance",
            "Estate_Cleaning",
            "Estate_CCTV",
            "Estate_Communal_Electricity",
            "Estate_Grounds_Maintenance",
            "Estate_Repairs_and_Maintenance",
            "Estate_Tree_Maintenance",
        ]

        return render_template('block_charges.html', estates=estates, charges=charges, charge_types=charge_types)

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
