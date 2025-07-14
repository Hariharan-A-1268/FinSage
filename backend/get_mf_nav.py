import pandas as pd
import os
from datetime import datetime, timedelta

def fetch_mf_nav(isin, range_option):
    prediction_filename = f"fund_predictions_csv/predicted_NAV_{isin}.csv"
    historical_filename = f"fund_historical_csv/historical_NAV_{isin}.csv"

    if not os.path.exists(prediction_filename):
        raise FileNotFoundError(f"The prediction file {prediction_filename} does not exist.")
    if not os.path.exists(historical_filename):
        raise FileNotFoundError(f"The historical file {historical_filename} does not exist.")

    # Read prediction CSV
    pred_df = pd.read_csv(prediction_filename)
    if "Date" not in pred_df.columns or "Price" not in pred_df.columns:
        raise ValueError("Prediction CSV must contain 'Date' and 'Price' columns.")

    # Read historical CSV
    hist_df = pd.read_csv(historical_filename)
    if "Date" not in hist_df.columns or "Price" not in hist_df.columns:
        raise ValueError("Historical CSV must contain 'Date' and 'Price' columns.")

    # Convert Date columns to datetime
    pred_df['Date'] = pd.to_datetime(pred_df['Date'])
    hist_df['Date'] = pd.to_datetime(hist_df['Date'])

    # Range mapping
    ranges = {
        '1M': 30,
        '3M': 90,
        '6M': 180,
        '1Y': 365,
        '3Y': 365 * 3,
        '5Y': 365 * 5,
    }
    days = ranges.get(range_option, 30)  # Default to 1M if invalid

    today = datetime(2025, 4, 7)
    start_date = today - timedelta(days=days)
    end_date = today + timedelta(days=days)

    # Filter historical data (up to today)
    hist_filtered = hist_df[(hist_df['Date'] >= start_date) & (hist_df['Date'] <= today)]

    # Filter predicted data (from today onward)
    pred_filtered = pred_df[(pred_df['Date'] >= today) & (pred_df['Date'] <= end_date)]

    # Before converting to dicts, format 'Date' to string YYYY-MM-DD
    hist_filtered['Date'] = hist_filtered['Date'].dt.strftime('%Y-%m-%d')
    pred_filtered['Date'] = pred_filtered['Date'].dt.strftime('%Y-%m-%d')

    # Convert to list of dicts
    historical = hist_filtered.sort_values('Date').to_dict(orient="records")
    predictions = pred_filtered.sort_values('Date').to_dict(orient="records")

    result = {
        "historical": historical,
        "predictions": predictions
    }

    return result
