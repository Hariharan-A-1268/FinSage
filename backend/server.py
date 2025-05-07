import os
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from dotenv import load_dotenv
import fd_analysis
import rd_analysis
import investment_recommendation
import gold_data
import mf_recommendations
import about_mutualfund
import get_news_links
import get_mf_nav

#pip install flask flask-bcrypt flask-jwt-extended flask-cors python-dotenv sqlitecloud sqlalchemy-sqlitecloud scipy

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "Innovate48"
jwt = JWTManager(app)
# Set JWT expiration to 30 minutes
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=180)

# Use a local SQLite database
LOCAL_DB_PATH = "sqlite:///innovate.db"

# Create the database engine
engine = create_engine(LOCAL_DB_PATH, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# User Model
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(200), nullable=False)

# Create Tables
Base.metadata.create_all(bind=engine)

# User Signup Route
@app.route("/api/user/signup", methods=["POST"])
def signup():
    session = SessionLocal()
    data = request.json
    name, email, password = data.get("name"), data.get("email"), data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required"}), 400

    existing_user = session.query(User).filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(name=name, email=email, password=hashed_password)
    access_token = create_access_token(identity=email)

    session.add(new_user)
    session.commit()
    session.close()

    return jsonify({"message": "User registered successfully", "token": access_token}), 201

# User Login Route
@app.route("/api/user/login", methods=["POST"])
def login():
    session = SessionLocal()
    data = request.json
    email, password = data.get("email"), data.get("password")

    user = session.query(User).filter_by(email=email).first()
    session.close()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.email)
        return jsonify({"message": "Login successful", "token": access_token})

    return jsonify({"message": "Invalid email or password"}), 401

# Protected User Profile Route
@app.route("/api/user/profile", methods=["GET"])
@jwt_required()
def profile():
    session = SessionLocal()
    user_email = get_jwt_identity()
    user = session.query(User).filter_by(email=user_email).first()
    session.close()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"name": user.name, "email": user.email})

@app.route("/api/user/profile/update-name", methods=["PUT"])
@jwt_required()
def update_user_name():
    session = SessionLocal()
    user_email = get_jwt_identity()
    user = session.query(User).filter_by(email=user_email).first()

    if not user:
        session.close()
        return jsonify({"message": "User not found"}), 404

    data = request.json
    new_name = data.get("name")
    if not new_name:
        session.close()
        return jsonify({"message": "Name is required"}), 400

    user.name = new_name
    session.commit()
    session.close()

    return jsonify({"message": "Name updated successfully"}), 200

@app.route("/api/user/reset-password", methods=["PUT"])
@jwt_required()
def reset_password():
    session = SessionLocal()
    user_email = get_jwt_identity()
    user = session.query(User).filter_by(email=user_email).first()

    if not user:
        session.close()
        return jsonify({"message": "User not found"}), 404

    data = request.json
    new_password = data.get("newPassword")

    if not new_password:
        session.close()
        return jsonify({"message": "New password is required"}), 400

    hashed_password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    user.password = hashed_password

    session.commit()
    session.close()

    return jsonify({"message": "Password updated successfully"}), 200

# Investment Recommendation Route
@app.route("/api/investment-recommendation", methods=["POST"])
def investment_recommendation_route():
    data = request.json
    investment_amount = data.get("income")
    risk_level = data.get("riskLevel")
    return_period = data.get("returnPeriod")

    if not investment_amount or not risk_level or not return_period:
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        investment_amount = float(investment_amount)
        return_period = int(return_period)
    except ValueError:
        return jsonify({"error": "Invalid data format"}), 400

    # Get investment allocation
    result = investment_recommendation.investment_allocation(investment_amount, risk_level, return_period)

    return jsonify(result)
    

# FD Analysis Route
@app.route("/api/fd-analysis", methods=["POST"])
def fd_analysis_route():
    data = request.json
    amount = data.get("amount")
    term = data.get("term")

    if not amount or not term:
        return jsonify({"error": "Both Amount and Term are required"}), 400

    try:
        amount = float(amount)
        term = int(term)
    except ValueError:
        return jsonify({"error": "Invalid input format"}), 400

    db_path = "innovate.db"  # Path to the SQLite database
    result = fd_analysis.get_top_banks(db_path, amount, term)

    return jsonify(result)

# RD Analysis Route
@app.route("/api/rd-analysis", methods=["POST"])
def rd_analysis_route():
    data = request.json
    amount = data.get("amount")
    term = data.get("term")

    if not amount or not term:
        return jsonify({"error": "Both amount and term are required"}), 400

    db_path = "innovate.db"  # Path to the SQLite database
    result = rd_analysis.get_top_banks(amount, term, db_path)

    return jsonify(result)

#Gold Route
@app.route('/api/gold', methods=['GET'])
def get_gold_route():
    db_path = "innovate.db"
    range_option = request.args.get('range')
    karat_option = request.args.get('karat')
    investment_amount = request.args.get('investmentAmount')  # New investment amount

    # Convert types safely
    try:
        karat_option = int(karat_option)
        investment_amount = float(investment_amount)
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid input parameters'}), 400

    result = gold_data.get_gold_data(karat_option, range_option, investment_amount, db_path)

    return jsonify(result)


#Mutualfund Recommendation Route
@app.route('/api/mf/recommendation', methods=['POST'])
def get_mf_recommendation_route():
    data = request.json
    amount = data.get("investmentAmount")
    year = data.get("returnPeriod")
    risk = data.get("riskLevel")
    result = mf_recommendations.get_mf_recommendations(year, risk)

    return jsonify(result)

#About Mutualfund Route
@app.route('/api/mf/about', methods=['POST'])
def get_about_mf_route():
    data = request.json
    isin = data.get("isin")
    result = about_mutualfund.run_all(isin)

    return jsonify(result)

#Mutualfund Chart Route
@app.route('/api/mf/graph', methods=['GET'])
def get_mf_graph_route():
    isin = request.args.get("isin")
    range = request.args.get("range")
    result = get_mf_nav.fetch_mf_nav(isin, range)

    return jsonify(result)

#News Route
@app.route('/api/news/<category>', methods=['GET'])
def get_news_by_category(category):
    news_data = get_news_links.fetch_financial_news()

    # Normalize category string to match the title keys in your dictionary
    category_map = {
        "mutualfund": "Mutual Funds",
        "recurringdeposit": "Recurring Deposits (RD)",
        "fixeddeposit": "Fixed Deposits (FD)",
        "gold": "Gold Prices",
        "financialnews":"Financial News"
    }

    title = category_map.get(category.lower())
    if not title:
        return jsonify({"error": "Invalid category"}), 404

    for news in news_data:
        if news['topic'] == title:
            return jsonify(news['articles'])

    return jsonify({"error": "News not found"}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
