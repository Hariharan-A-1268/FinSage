import sqlite3
import pandas as pd

def get_inflation_rate(year):
    # Step 1: Connect to SQLite Database
    conn = sqlite3.connect("innovate.db")  # your database
    cursor = conn.cursor()

    # Get current month and year
    current_month = 4 # pd.Timestamp.today().month
    current_year = 2025 # pd.Timestamp.today().year

    # Map month number to month name
    month_name = pd.to_datetime(str(current_month), format='%m').strftime('%B')

    current_cpi = previous_cpi = 0

    # Current CPI: (this month, current year + years)
    target_year = current_year + year
    cursor.execute(f"""
        SELECT CPI FROM future_CPI 
        WHERE Year = ? AND Month = ?
    """, (target_year, month_name))
    result = cursor.fetchone()

    if result:
        current_cpi = result[0]
    else:
        print(f"No CPI data found for {month_name} {target_year}")
        return 0

    # Previous CPI: (this month, current year + (years - 1))
    previous_year = current_year + (year - 1)
    cursor.execute(f"""
        SELECT CPI FROM future_CPI 
        WHERE Year = ? AND Month = ?
    """, (previous_year, month_name))
    result = cursor.fetchone()

    # Step 2: Close the database connection
    conn.close()

    if result:
        previous_cpi = result[0]
    else:
        print(f"No CPI data found for {month_name} {previous_year}")
        return 0

    # Inflation Rate Calculation
    inflation_rate = round(((current_cpi - previous_cpi) / previous_cpi) * 100, 2)

    return inflation_rate
