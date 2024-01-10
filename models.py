from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Estates(db.Model):
    __tablename__ = 'estates'

    ID = db.Column(db.Integer, primary_key=True)
    Estate_Name = db.Column(db.String, nullable=False)
    Estate_RV = db.Column(db.Integer, nullable=False)

class Blocks(db.Model):
    __tablename__ = 'blocks'

    ID = db.Column(db.Integer, primary_key=True)
    Block_Name = db.Column(db.String, nullable=False)
    Block_RV = db.Column(db.Integer, nullable=False)
    Estate_ID = db.Column(db.Integer, db.ForeignKey('estates.ID'), nullable=False)

    estate = db.relationship('Estates', backref=db.backref('blocks', lazy=True))

class Charges(db.Model):
    __tablename__ = 'charges'

    Year_Start = db.Column(db.Integer, primary_key=True)
    Year_End = db.Column(db.Integer, primary_key=True)
    Block_ID = db.Column(db.Integer, primary_key=True)
    Estate_ID = db.Column(db.Integer, primary_key=True)

    Block_Boiler_Repairs_and_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_Cleaning = db.Column(db.Numeric(precision=10, scale=2))
    Block_Communal_Electricity = db.Column(db.Numeric(precision=10, scale=2))
    Block_Communal_Electrical_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_Communal_Ventilation_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_Communal_Water_Quality = db.Column(db.Numeric(precision=10, scale=2))
    Block_Communal_Window_Cleaning = db.Column(db.Numeric(precision=10, scale=2))
    Block_Concierge = db.Column(db.Numeric(precision=10, scale=2))
    Block_CCTV = db.Column(db.Numeric(precision=10, scale=2))
    Block_Disinfestation = db.Column(db.Numeric(precision=10, scale=2))
    Block_Door_Entry_System = db.Column(db.Numeric(precision=10, scale=2))
    Block_Dry_Riser = db.Column(db.Numeric(precision=10, scale=2))
    Block_Lightning_Protection = db.Column(db.Numeric(precision=10, scale=2))
    Block_Lift_Services_and_Repairs = db.Column(db.Numeric(precision=10, scale=2))
    Block_Fire_Ventilation_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_Repairs_and_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_TV_Aerial = db.Column(db.Numeric(precision=10, scale=2))
    Block_Ext_Cleaning = db.Column(db.Numeric(precision=10, scale=2))
    Block_Ext_External_Tree_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_Ext_Grounds_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Block_Ext_Repairs_and_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Estate_Cleaning = db.Column(db.Numeric(precision=10, scale=2))
    Estate_CCTV = db.Column(db.Numeric(precision=10, scale=2))
    Estate_Communal_Electricity = db.Column(db.Numeric(precision=10, scale=2))
    Estate_Grounds_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Estate_Repairs_and_Maintenance = db.Column(db.Numeric(precision=10, scale=2))
    Estate_Tree_Maintenance = db.Column(db.Numeric(precision=10, scale=2))

