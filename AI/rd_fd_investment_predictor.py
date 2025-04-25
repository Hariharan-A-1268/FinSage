import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error
from datetime import datetime

def calculate_rd_maturity(monthly_deposit, rate, years):
    """
    Calculate the maturity amount for an RD using the formula:
    A = P * [(1 + r/n)^(nt) - 1] / r * (1 + r)
    Where:
        A = Maturity Amount
        P = Monthly Deposit
        r = Annual Interest Rate (in decimal)
        n = Compounded monthly (n=12)
        t = Time in years
    """
    n = 12  # Monthly compounding
    r = rate / 100 / n  # Monthly interest rate in decimal
    t = years * n  # Total number of months

    if r == 0:
        maturity_amount = monthly_deposit * t  # No interest case
    else:
        maturity_amount = monthly_deposit * ((1 + r) ** t - 1) / r * (1 + r)

    return round(maturity_amount, 2)

# Load forecasted CPI data
forecast_df = pd.read_csv("forecasted_CPI.csv")

# Get user inputs for investment details
investment_amount_fd = float(input("Enter the investment amount for FD (₹): "))
investment_amount_rd = float(input("Enter monthly investment amount for RD (₹): "))
rd_return = float(input("Enter the RD interest rate (%): "))
fd_return = float(input("Enter the FD interest rate (%): "))

years_options = [1, 3, 5]
for years in years_options:
    # Get the forecasted CPI for the current and previous year
    current_cpi = forecast_df[forecast_df['Year'] == (datetime.now().year + years)]['Forecasted_CPI'].values[0]
    previous_cpi = forecast_df[forecast_df['Year'] == (datetime.now().year + years - 1)]['Forecasted_CPI'].values[0]

    # Inflation Rate Calculation (for each year period)
    inflation_rate = ((current_cpi - previous_cpi) / previous_cpi) * 100
    print(f"\n--- Investment Returns for {years} Years ---")
    print(f"Estimated Annual Inflation Rate (based on CPI): {inflation_rate:.2f}%")

    # Nominal returns
    rd_nominal = calculate_rd_maturity(investment_amount_rd, rd_return, years)
    fd_nominal = investment_amount_fd * ((1 + fd_return / 100) ** years)

    # Real return = Nominal Return / (1 + Inflation Rate) ^ Years
    rd_real_amt = rd_nominal / ((1 + inflation_rate / 100) ** years)
    fd_real_amt = fd_nominal / ((1 + inflation_rate / 100) ** years)

    # Final Output for each year group
    print(f"RD Nominal Return after {years} years: ₹{rd_nominal:,.2f}")
    print(f"FD Nominal Return after {years} years: ₹{fd_nominal:,.2f}")
    print(f"Assumed Inflation Rate: {inflation_rate:.2f}%")
    print(f"RD Real Return (adjusted for inflation): ₹{rd_real_amt:,.2f}")
    print(f"FD Real Return (adjusted for inflation): ₹{fd_real_amt:,.2f}")
