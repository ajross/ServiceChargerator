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
