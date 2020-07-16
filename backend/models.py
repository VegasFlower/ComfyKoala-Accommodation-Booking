from extention import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False, default='', unique=True)
    email = db.Column(db.String(40), nullable=False, unique=True)
    password = db.Column(db.String(50), nullable=False)
    usertype = db.Column(db.Integer, nullable=False)


class Accommodation(db.Model):
    __tablename__ = 'accommodation'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    address = db.Column(db.String(100))
    price = db.Column(db.Integer, default=0)
    bond = db.Column(db.Integer, default=0)
    provider_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    provider = db.relationship('User', foreign_keys=[provider_id])
    parking = db.Column(db.Boolean, default=False, nullable=False)
    booked = db.Column(db.Boolean, default=False)
    pet = db.Column(db.Boolean, default=False, nullable=False)
    startdate = db.Column(db.Date)
    leastperiod = db.Column(db.Integer, default=1)
    category = db.Column(db.String(20))
    description = db.Column(db.Text, default='')
    feature = db.Column(db.String(100))
    rate = db.Column(db.Float, default=0, nullable=False)
    ratetimes = db.Column(db.Integer, default=0, nullable=False)


class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_date = db.Column(db.DateTime)
    description = db.Column(db.Text)
    rate = db.Column(db.Float)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    author = db.relationship('User', foreign_keys=[author_id])
    property_id = db.Column(db.Integer, db.ForeignKey('accommodation.id'), primary_key=True)
    property = db.relationship('Accommodation', foreign_keys=[property_id])


class Photo(db.Model):
    __tablename__ = 'photo'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    photo_content = db.Column(db.LargeBinary(2**32 - 1))
    property_id = db.Column(db.Integer, db.ForeignKey('accommodation.id'), primary_key=True)
    property = db.relationship('Accommodation', foreign_keys=[property_id])


class Booking(db.Model):
    __tablename__ = 'booking'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    customer = db.relationship('User', foreign_keys=[customer_id])
    property_id = db.Column(db.Integer, db.ForeignKey('accommodation.id'), primary_key=True)
    property = db.relationship('Accommodation', foreign_keys=[property_id])
    start_time = db.Column(db.Date)
    end_time = db.Column(db.Date)
    approved = db.Column(db.Boolean, default=False)
    price = db.Column(db.Integer, default=0)
    rejected = db.Column(db.Boolean, default=False)