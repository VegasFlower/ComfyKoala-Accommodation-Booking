from flask import Flask, render_template
import config
import base64
import time
import jwt
import datetime
from extention import db
from flask import request, render_template, flash, redirect, url_for, session, Flask, jsonify
from flask_login import LoginManager, login_user, current_user, login_required, logout_user
from flask_cors import CORS
from flask_restplus import Resource, Api, abort
from flask_restplus import fields
from flask_restplus import inputs
from flask_restplus import reqparse
from itsdangerous import SignatureExpired, JSONWebSignatureSerializer, BadSignature
from models import User, Accommodation, Comment, Photo, Booking
import json
from functools import wraps


class AuthenticationToken:
    def __init__(self, secret_key, expire):
        self.secret_key = secret_key
        self.expire = expire

    def generate_token(self, username):
        info = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=self.expire)
        }
        return jwt.encode(info, self.secret_key, algorithm='HS256')

    def validate_token(self, token):
        info = jwt.decode(token, self.secret_key, algorithms=['HS256'])
        return info['username']


blacklist = []
SECRET_KEY = "A SECRET KEY"
expire = 6000
auth = AuthenticationToken(SECRET_KEY, expire)

app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")
CORS(app)
app.config.from_object(config)
db.init_app(app)
with app.app_context():
    db.create_all()


def requires_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('AUTH-TOKEN')
        if not token:
            abort(401, 'Authentication token is missing')
        try:
            user = auth.validate_token(token)
        except Exception as e:
            abort(401, e)

        return f(*args, **kwargs)

    return decorated


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/api/login', methods=['POST', 'GET'])
def customer_login():
    info = request.json
    username = info.get('username')
    password = info.get('password')
    print(info)
    if username:
        user = User.query.filter(User.username == username).first()
    if not user:
        return jsonify({'code': 404, 'message': 'invalid username'})
    if password and password == user.password:
        token = auth.generate_token(username)
        user_info = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "usertype":user.usertype,
        }
        if user.usertype == 1:
            return jsonify({'user': user_info, 'code': 200, "token": token.decode('UTF-8'), "message": "login successfully as a customer"})
        else:
            return jsonify({'user': user_info, 'code': 200, "token": token.decode('UTF-8'), "message": "login successfully as an owner"})
    else:
        return jsonify({'code': 404, 'message': 'invalid password'})


@app.route('/api/register', methods=['POST', 'GET'])
def register():
    info = request.json
    username = info.get('username')
    password = info.get('password')
    email = info.get('email')
    usertype = info.get('usertype')
    if username == '' or password == '':
        return jsonify({"code": 400, "message":'username and password cannot be empty'})
    username_exist = User.query.filter(User.username == username).first()
    if username_exist:
        return jsonify({"code": 409, "message": 'Username has been used'})
    user = User(username=username, password=password, email=email, usertype=usertype)
    db.session.add(user)
    db.session.commit()
    return jsonify({"code": 200, "message": 'Register successfully'})


@app.route('/api/logout', methods=['POST', 'GET'])
@requires_token
def logout():
    token = request.headers.get('AUTH-TOKEN')
    blacklist.append(token)
    return jsonify({'code': 200, 'message': auth.validate_token(token)+' Log out successfully'})


@app.route('/api/delete_user', methods=['POST', 'GET'])
def delete_user():
    info = request.json
    username = info.get('username')
    User.query.filter(User.username == username).delete()
    db.session.commit()
    return jsonify({'code': 200, 'message': username+' deleted successfully'})


@app.route('/api/search', methods=['POST', 'GET'])
def search():
    data = request.json
    suburb = data['suburb']
    order = data['order']
    print(suburb)
    if order:
        if order == "date":
            accommo = Accommodation.query.filter(Accommodation.address.contains(suburb)).\
                order_by(Accommodation.startdate).all()
        elif order == "price":
            accommo = Accommodation.query.filter(Accommodation.address.contains(suburb)). \
                order_by(Accommodation.price).all()
        else:
            accommo = Accommodation.query.\
                filter((Accommodation.address.contains(suburb)) & (Accommodation.category == order)).all
    else:
        accommo = Accommodation.query.filter(Accommodation.address.contains(suburb)).all()
    array = []
    for i in accommo:
        photo_list = []
        photos = Photo.query.filter(Photo.property_id == i.id).order_by(Photo.id.desc()).limit(5)
        for p in photos:
            new_text = p.photo_content.decode('utf-8')
            photo_list.append(new_text)
        print(round(i.rate * 2) / 2)
        print(i.startdate)
        data = {
            "id": i.id,
            "description": i.description,
            "pet_allow": i.pet,
            "parking": i.parking,
            "feature": i.feature,
            "least_period": i.leastperiod,
            "start_date": i.startdate.strftime("%d %b %Y"),
            "address": i.address,
            "category": i.category,
            "price": i.price,
            "bond": i.bond,
            "rate": round(i.rate * 2) / 2,
            "photos": photo_list,
        }
        array.append(data)
    respdict = {"code": 200, "message": "Get list ok", "data": array}
    return jsonify(respdict)


@app.route('/api/property_info', methods=['POST', 'GET', 'DELETE', 'PUT'])
@requires_token
def property_info():
    if request.method == 'POST':
        token = request.headers.get('AUTH-TOKEN')

        info = request.json
        print(info)
        # image = info.get('image')
        description = info.get('description')
        pet_allow = info.get('pet_allow')
        parking = info.get('parking')
        feature = info.get('feature')
        least_period = info.get('least_period')
        start_date = info.get('start_date')
        address = info.get('address')
        category = info.get('category')
        price = info.get('price')
        bond = info.get('bond')
        username = auth.validate_token(token)
        owner = User.query.filter(User.username == username).first()
        accommo = Accommodation(address=address, price=price, bond=bond, provider_id=owner.id, parking=parking,
                                pet=pet_allow, startdate=start_date, leastperiod=least_period, category=category,
                                description=description, feature=feature, rate=0, ratetimes=0)
        db.session.add(accommo)
        db.session.commit()
        # image_byte = image.encode('ascii')
        # image_str = base64.b64encode(image_byte)
        # photo = Photo(photo_content=image_str, property_id=accommo.id)
        # db.session.add(photo)
        # db.session.commit()
        property_info = {
            # "image":image,
            "id": accommo.id,
            "description":description,
            "pet_allow":pet_allow,
            "parking" :parking,
            "feature":feature,
            "least_period":least_period,
            "start_date":start_date,
            "address":address,
            "category":category,
            "price":price,
            "bond":bond,
        }
        respdict = {"code": 200, 'property': property_info,"message": "Upload Property OK"}
        return jsonify(respdict)

    if request.method == 'DELETE':
        info = request.json
        property_id = info.get('id')
        photos = Photo.query.filter(Photo.property_id == property_id).all()
        for p in photos:
            db.session.delete(p)
            db.session.commit()
        comments = Comment.query.filter(Comment.property_id == property_id).all()
        for c in comments:
            db.session.delete(c)
            db.session.commit()
        bookings = Booking.query.filter(Booking.property_id == property_id).all()
        for b in bookings:
            db.session.delete(b)
            db.session.commit()
        accommo = Accommodation.query.filter(Accommodation.id == property_id).first()
        db.session.delete(accommo)
        db.session.commit()
        respdict = {"code": 200, "message": "Delete Property OK"}
        return jsonify(respdict)

    if request.method == 'PUT':
        token = request.headers.get('AUTH-TOKEN')
        info = request.json
        property_id = info.get('id')
        description = info.get('description')
        pet_allow = info.get('pet_allow')
        parking = info.get('parking')
        feature = info.get('feature')
        least_period = info.get('least_period')
        start_date = info.get('start_date')
        address = info.get('address')
        category = info.get('category')
        price = info.get('price')
        bond = info.get('bond')
        # username = auth.validate_token(token)
        # owner = User.query.filter(User.username == username).first()
        accommo = Accommodation.query.filter(Accommodation.id == property_id).first()
        if description:
            accommo.description = description
        if pet_allow:
            accommo.pet = pet_allow
        if parking:
            accommo.parking = parking
        if feature:
            accommo.feature = feature
        if least_period:
            accommo.leastperiod = least_period
        if start_date:
            accommo.startdate = start_date
        if address:
            accommo.address = address
        if category:
            accommo.category = category
        if price:
            accommo.price = price
        if bond:
            accommo.bond = bond
        db.session.commit()
        # image_byte = image.encode('ascii')
        # image_str = base64.b64encode(image_byte)
        # photo = Photo(photo_content=image_str, property_id=accommo.id)
        # db.session.add(photo)
        # db.session.commit()
        property_info = {
            # "image":image,
            "id": accommo.id,
            "description": accommo.description,
            "pet_allow": accommo.pet,
            "parking": accommo.parking,
            "feature": accommo.feature,
            "least_period": accommo.leastperiod,
            "start_date": accommo.startdate.strftime("%d %b %Y"),
            "address": accommo.address,
            "category": accommo.category,
            "price": accommo.price,
            "bond": accommo.bond,
        }
        respdict = {"code": 200, 'property': property_info,"message": "Update Property OK"}
        return jsonify(respdict)


@app.route('/api/upload/<id>', methods=['POST', 'GET'])
def upload(id):
#     data = request.json
    print(request.files)
#     print(request.files.data['filepond'])
    for key in request.files:
        image = request.files[key]
        image_byte = image.read()
        image_str = base64.b64encode(image_byte)
        photo = Photo(photo_content=image_str, property_id=id)
        db.session.add(photo)
        db.session.commit()
        # print(type(image_str))
    respdict = {"code": 200, "message": "Photo uploading ok"}
    return jsonify(respdict)


@app.route('/api/detailed_property/<id>', methods=['POST', 'GET'])
# @requires_token
def detailed_property(id):
    p = Accommodation.query.filter(Accommodation.id == id).first()
    owner = User.query.filter(User.id == p.provider_id).first()
    photo_list = []
    comment_list = []
    photos = Photo.query.filter(Photo.property_id == p.id).order_by(Photo.id.desc()).limit(5)
    for ph in photos:
        new_text = ph.photo_content.decode('utf-8')
        photo_list.append(new_text)
    comments = Comment.query.filter(Comment.property_id == p.id).all()
    for c in comments:
        author = User.query.filter(User.id == c.author_id).first()
        comment_info ={
            "id": c.id,
            "author": author.username,
            "date": c.post_date,
            "content": c.description,
            "rate": c.rate,
        }
        comment_list.append(comment_info)
    if p.booked is True:
        lease = Booking.query.filter((Booking.property_id == p.id) & (Booking.approved == True)).first()
        student = User.query.filter(User.id == lease.customer_id).first()
        book_by = student.username
    else:
        book_by = ""
    print(round(p.rate * 2) / 2)
    prop_info = {
        "id": p.id,
        "owner": owner.username,
        "email": owner.email,
        "book_by": book_by,
        "rate": round(p.rate * 2) / 2,
        "description": p.description,
        "pet_allow": p.pet,
        "parking": p.parking,
        "feature": p.feature,
        "least_period": p.leastperiod,
        "start_date": p.startdate.strftime("%d %b %Y"),
        "address": p.address,
        "category": p.category,
        "price": p.price,
        "bond": p.bond,
        "booked": p.booked,
        "photos": photo_list,
        "comments": comment_list,
    }
    respdict = {"code": 200, "property": prop_info}
    return jsonify(respdict)


@app.route('/api/delete_property', methods=['POST', 'GET'])
def delete_property():
    info = request.json
    id = info.get('id')
    Accommodation.query.filter(Accommodation.id == id).delete()
    db.session.commit()
    return jsonify({'code': 200, 'message': str(id) + ' deleted successfully'})


@app.route('/api/property_list', methods=['POST', 'GET'])
@requires_token
def property_list():
    token = request.headers.get('AUTH-TOKEN')
    username = auth.validate_token(token)
    owner = User.query.filter(User.username == username).first()
    properties = Accommodation.query.filter(Accommodation.provider_id == owner.id).all()
    prop_list = []
    for p in properties:
        photo_list = []
        comment_list = []
        photos = Photo.query.filter(Photo.property_id == p.id).order_by(Photo.id.desc()).limit(5)
        for ph in photos:
            # text = base64.b64decode()
            new_text = ph.photo_content.decode('utf-8')
            photo_list.append(new_text)
        comments = Comment.query.filter(Comment.property_id == p.id).all()
        for c in comments:
            author = User.query.filter(User.id == c.author_id).first()
            comment_info = {
                "id": c.id,
                "author": author.username,
                "date": c.post_date,
                "content": c.description,
                "rate": c.rate,
            }
            comment_list.append(comment_info)
        if p.booked is True:
            lease = Booking.query.filter((Booking.property_id == p.id) & (Booking.approved == True)).first()
            student = User.query.filter(User.id == lease.customer_id).first()
            book_by = student.username
        else:
            book_by = ""
        prop_info = {
            "id": p.id,
            "owner": username,
            "book_by": book_by,
            "rate": round(p.rate*2) / 2,
            "description": p.description,
            "pet_allow": p.pet,
            "parking" : p.parking,
            "feature": p.feature,
            "least_period": p.leastperiod,
            "start_date": p.startdate.strftime("%d %b %Y"),
            "address": p.address,
            "category": p.category,
            "price": p.price,
            "bond": p.bond,
            "booked": p.booked,
            "photos": photo_list,
            "comments": comment_list,
        }
        # print(photo_list)
        # print(prop_info)
        # new_dict = jsonify(prop_info)

        prop_list.append(prop_info)

    respdict = {'code': 200, 'message': 'Get info successfully', 'properties': prop_list}
    return jsonify(respdict)


# @app.route('/api/booking', methods=['POST', 'GET', 'DELETE'])
# @requires_token
# def booking():
#     if request.method == "POST":
#         token = request.headers.get('AUTH-TOKEN')
#         username = auth.validate_token(token)
#         customer = User.query.filter(User.username == username).first()
#         info = request.json
#         property_id = info.get('property_id')
#         room = Accommodation.query.filter(Accommodation.id == property_id).first()
#
#         new_date = datetime.datetime.strptime(str(room.startdate), '%Y-%m-%d')
#         length = 30 * int(room.leastperiod)
#         print(length)
#         end_date = new_date + datetime.timedelta(days=length)
#         print(end_date.date())
#         lease = Booking(customer_id=customer.id, property_id=property_id, start_time=room.startdate,
#                         end_time=end_date.date(), price=room.price)
#         room.booked = True
#         db.session.add(lease)
#         db.session.commit()
#         respdict = {'code': 200, 'message': 'Book successfully'}
#         return jsonify(respdict)
#     if request.method == 'DELETE':
#         info = request.json
#         booking_id = info.get('id')
#         contract = Booking.query.filter(Booking.id == booking_id).first()
#         accommo = Accommodation.query.filter(Accommodation.id == contract.property_id).first()
#         accommo.booked = False
#         db.session.delete(contract)
#         db.session.commit()
#         respdict = {'code': 200, 'message': 'Cancel successfully'}
#         return jsonify(respdict)

@app.route('/api/booking', methods=['POST', 'GET', 'DELETE'])
@requires_token
def booking():
    if request.method == "POST":
        token = request.headers.get('AUTH-TOKEN')
        username = auth.validate_token(token)
        customer = User.query.filter(User.username == username).first()
        info = request.json
        property_id = info.get('property_id')
        room = Accommodation.query.filter(Accommodation.id == property_id).first()

        new_date = datetime.datetime.strptime(str(room.startdate), '%Y-%m-%d')
        length = 30 * int(room.leastperiod)
        print(length)
        end_date = new_date + datetime.timedelta(days=length)
        print(end_date.date())
        lease = Booking(customer_id=customer.id, property_id=property_id, start_time=room.startdate,
                        end_time=end_date.date(), price=room.price)
        # room.booked = True
        db.session.add(lease)
        db.session.commit()
        respdict = {'code': 200, 'message': 'Booking request successfully'}
        return jsonify(respdict)

    if request.method == 'DELETE':
        info = request.json
        booking_id = info.get('id')
        contract = Booking.query.filter(Booking.id == booking_id).first()
        accommo = Accommodation.query.filter(Accommodation.id == contract.property_id).first()
        accommo.booked = False
        db.session.delete(contract)
        db.session.commit()
        respdict = {'code': 200, 'message': 'Cancel successfully'}
        return jsonify(respdict)


@app.route('/api/comment', methods=['POST', 'GET'])
@requires_token
def comment():
    token = request.headers.get('AUTH-TOKEN')
    username = auth.validate_token(token)
    customer = User.query.filter(User.username == username).first()
    info = request.json
    property_id = info.get('id')
    description = info.get('comment')
    rate = info.get('rate')
    post_time = datetime.datetime.now()
    accommo = Accommodation.query.filter(Accommodation.id == property_id).first()
    content = Comment(post_date=post_time, author_id=customer.id, property_id=property_id, description=description, rate=rate)
    db.session.add(content)

    curr_times = accommo.ratetimes
    curr_rate = accommo.rate
    accommo.rate = (curr_rate * curr_times + rate)/(curr_times + 1)
    accommo.rate = round(accommo.rate * 2) / 2
    accommo.ratetimes = curr_times + 1
    db.session.commit()
    data = {
        "avg_rate": accommo.rate,
        "comment": content.description,
        "property_id": content.property_id,
    }
    respdict = {'code': 200, 'message': 'Comment Successfully', 'data': data}
    return jsonify(respdict)


@app.route('/api/top_property', methods=['POST', 'GET'])
# @requires_token
def top_property():
    properties = Accommodation.query.order_by(Accommodation.rate.desc()).limit(4)
    prop_list = []
    for p in properties:
        photo_list = []
        photos = Photo.query.filter(Photo.property_id == p.id).order_by(Photo.id.desc()).limit(5)
        owner = User.query.filter(User.id == p.provider_id).first()
        for ph in photos:
            new_text = ph.photo_content.decode('utf-8')
            photo_list.append(new_text)
        # if p.booked is True:
        #     lease = Booking.query.filter(Booking.property_id == p.id).first()
        #     student = User.query.filter(User.id == lease.customer_id).first()
        #     book_by = student.username
        # else:
        #     book_by = ""
        prop_info = {
            "id": p.id,
            "owner": owner.username,
            # "book_by": book_by,
            "rate": round(p.rate * 2) / 2,
            "description": p.description,
            "pet_allow": p.pet,
            "parking": p.parking,
            "feature": p.feature,
            "least_period": p.leastperiod,
            "start_date": p.startdate.strftime("%d %b %Y"),
            "address": p.address,
            "category": p.category,
            "price": p.price,
            "bond": p.bond,
            "booked": p.booked,
            "photos": photo_list,
            # "comments": comment_list,
        }
        print(p.id)
        # print(prop_info)
        # new_dict = jsonify(prop_info)

        prop_list.append(prop_info)

    respdict = {'code': 200, 'message': 'Get info successfully', 'properties_list': prop_list}
    return jsonify(respdict)


@app.route('/api/user_info', methods=['POST', 'GET','PUT'])
@requires_token
def user_info():
    if request.method == 'GET':
        token = request.headers.get('AUTH-TOKEN')
        username = auth.validate_token(token)
        user = User.query.filter(User.username == username).first()
        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "usertype":user.usertype,
        }
        respdict = {'code': 200, 'info': data}
        return jsonify(respdict)

    if request.method == "PUT":
        token = request.headers.get('AUTH-TOKEN')
        username = auth.validate_token(token)
        user = User.query.filter(User.username == username).first()
        info = request.json
        password = info.get('password')
        email = info.get('email')
        if password:
            user.password = password
        if email:
            user.email = email
        db.session.commit()
        respdict = {'code': 200, 'message': "update successfully"}
        return jsonify(respdict)


@app.route('/api/student_history', methods=['POST', 'GET'])
@requires_token
def student_history():
    token = request.headers.get('AUTH-TOKEN')
    username = auth.validate_token(token)
    user = User.query.filter(User.username == username).first()
    bookings = Booking.query.filter((Booking.customer_id == user.id) & (Booking.approved == True)).all()
    booking_list = []
    for b in bookings:
        accommo = Accommodation.query.filter(Accommodation.id == b.property_id).first()
        owner = User.query.filter(User.id == accommo.provider_id).first()
        photo_list = []
        comment_list = []
        photos = Photo.query.filter(Photo.property_id == accommo.id).order_by(Photo.id.desc()).limit(5)
        for ph in photos:
            # text = base64.b64decode()
            new_text = ph.photo_content.decode('utf-8')
            photo_list.append(new_text)
        comments = Comment.query.filter(Comment.property_id == accommo.id).all()
        for c in comments:
            comment_list.append(c.description)
        booking_info = {
            "booking_id": b.id,
            "owner": owner.username,
            "start_time": b.start_time.strftime("%d %b %Y"),
            "end_time": b.end_time.strftime("%d %b %Y"),
            "category": accommo.category,
            "price": accommo.price,
            "bond": accommo.bond,
            "address": accommo.address,
            "photos": photo_list,
            "rate": round(accommo.rate * 2) / 2,
            "description": accommo.description,
            "pet_allow": accommo.pet,
            "parking": accommo.parking,
            "feature": accommo.feature,
            "comments": comment_list,
        }
        booking_list.append(booking_info)
    respdict = {'code': 200, 'booking_list': booking_list}
    return jsonify(respdict)


@app.route('/api/find_account', methods=['POST', 'GET', 'PUT'])
def find_account():
    info = request.json
    username = info.get('username')
    password = info.get('password')
    email = info.get('email')
    user_exist = User.query.filter(User.username == username).first()
    if user_exist:
        if password:
            if email == user_exist.email:
                user_exist.password = password
            else:
                respdict = {'code': 404, 'message': "Email Address Wrong"}
                return jsonify(respdict)
        db.session.commit()
        respdict = {'code': 200, 'message': "update successfully"}
        return jsonify(respdict)
    else:
        respdict = {'code': 404, 'message': "Username Not exist"}
        return jsonify(respdict)

@app.route('/api/compare_price', methods=['POST', 'GET'])
def compare_price():
    info = request.json
    category = info.get('category')
    items = Accommodation.query.filter(Accommodation.category == category).all()
    count = 0
    total_price = 0
    average = 0
    for i in items:
        total_price += i.price
        count = count + 1
        average = total_price / count
    # average = db.session
    print(average)
    respdict = {'code': 200, 'message': "The average price for " + category + " is $" + str(average), "average": average}
    return jsonify(respdict)


@app.route('/api/approve', methods=['POST', 'GET'])
@requires_token
def approve():
    if request.method == 'POST':
        info = request.json
        token = request.headers.get('AUTH-TOKEN')
        username = auth.validate_token(token)
        user_id = info.get('user_id')
        property_id = info.get('property_id')
        action = info.get('action')
        room = Accommodation.query.filter(Accommodation.id == property_id).first()
        application = Booking.query.filter(((Booking.customer_id == user_id) & (Booking.property_id == property_id)) & (Booking.approved == False) & (Booking.rejected == False)).first()
        if action == "accept":
            application.approved = True
            application.rejected = False
            room.booked = True
            db.session.commit()
        else:
            application.approved = False
            application.rejected = True
            db.session.commit()

        respdict = {'code': 200, 'message': "Approve successfully"}
        return jsonify(respdict)

    if request.method == 'GET':
        token = request.headers.get('AUTH-TOKEN')
        username = auth.validate_token(token)
        owner = User.query.filter(User.username == username).first()
        properties = Accommodation.query.filter(Accommodation.provider_id == owner.id).all()
        application_list = []
        print(properties)
        for p in properties:
            application = Booking.query.filter(((Booking.property_id == p.id) & (Booking.approved == False)) & (Booking.rejected == False)).all()
            print(application)
            if application:
                print(application)
                application_list.extend(application)
        info_list = []
        print(application_list)
        if application_list:
            for a in application_list:
                customer = User.query.filter(User.id == a.customer_id).first()
                room = Accommodation.query.filter(Accommodation.id == a.property_id).first()
                info = {
                    "user_id": customer.id,
                    "user_name": customer.username,
                    "property_id": room.id,
                    "address": room.address,
                }
                info_list.append(info)

        respdict = {'code': 200, 'message': "Get List successfully", "data": info_list,
                    "number": len(info_list)}
        return jsonify(respdict)


if __name__ == "__main__":
    app.run()