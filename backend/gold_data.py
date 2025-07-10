import sqlite3
from datetime import datetime, timedelta

def get_gold_data(karat_option, range_option, investment_amount, db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Map range_option to number of days
    ranges = {
        '1M': 30,
        '3M': 90,
        '6M': 180,
        '1Y': 365,
        '3Y': 365 * 3,
        '5Y': 365 * 5,
    }
    days = ranges.get(range_option, 30)

    today = datetime(2025, 4, 7)
    start_date = (today - timedelta(days=days)).strftime('%Y-%m-%d')
    end_date = (today + timedelta(days=days)).strftime('%Y-%m-%d')

    # Query historical data
    historical_query = """
        SELECT date, price FROM historical_gold
        WHERE date BETWEEN ? AND ?
        ORDER BY date
    """
    cursor.execute(historical_query, (start_date, today.strftime('%Y-%m-%d')))
    historical_data = cursor.fetchall()

    # Query predicted data
    predicted_query = """
        SELECT date, price FROM future_gold
        WHERE date BETWEEN ? AND ?
        ORDER BY date
    """
    cursor.execute(predicted_query, (today.strftime('%Y-%m-%d'), end_date))
    predicted_data = cursor.fetchall()

    conn.close()

    # Karat adjustment (22k or 24k)
    karat_multiplier = 1.0 if karat_option == 24 else 0.9167

    # Adjusted data
    historical_prices = [{'date': d, 'price': round(p * karat_multiplier, 2)} for d, p in historical_data]
    predicted_prices = [{'date': d, 'price': round(p * karat_multiplier, 2)} for d, p in predicted_data]

    # Calculate today's price (latest historical price)
    if not historical_prices:
        return {'error': 'No historical data available'}

    today_price = historical_prices[-1]['price']

    # Calculate grams of gold that can be bought today
    gold_grams = investment_amount / today_price

    # Find predicted price at end of range (last predicted price)
    if predicted_prices:
        final_predicted_price = predicted_prices[-1]['price']
    else:
        final_predicted_price = today_price  # fallback if no predicted data

    # Calculate future value
    future_value = gold_grams * final_predicted_price

    # Calculate profit
    profit = future_value - investment_amount

    return {
        'historical': historical_prices,
        'predicted': predicted_prices,
        'investment_summary': {
            'investment_amount': investment_amount,
            'gold_grams': round(gold_grams, 2),
            'future_value': round(future_value, 2),
            'predicted_profit': round(profit, 2),
            'today_price': today_price,
            'predicted_price_at_end': final_predicted_price
        }
    }
