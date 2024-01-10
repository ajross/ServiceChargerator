from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/block_charges')
def block_charges():
    return render_template('block_charges.html')

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
