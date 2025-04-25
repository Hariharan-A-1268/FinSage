import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

# Load data
df = pd.read_csv("CPI.csv")
df['Date'] = pd.to_datetime(df['Year'].astype(str) + '-' + df['Month'], format='%Y-%B')
df = df[['Date', 'Combined']].rename(columns={'Date': 'ds', 'Combined': 'y'})

# Fit the Prophet model
model = Prophet()
model.fit(df)

# Forecasting future CPI for 5 years (monthly)
future = model.make_future_dataframe(periods=60, freq='MS')
forecast = model.predict(future)

# Evaluation on available known data
actual = df['y']
predicted = model.predict(df[['ds']])['yhat']

mae = mean_absolute_error(actual, predicted)
mse = mean_squared_error(actual, predicted)
rmse = np.sqrt(mse)

print("Prophet Forecasting:")
print(f"MAE: {mae:.2f}")
print(f"MSE: {mse:.2f}")
print(f"RMSE: {rmse:.2f}")

# -----------------------------
# Save Plot as PNG
# -----------------------------
fig = model.plot(forecast)
plt.title("CPI Forecast using Prophet")
plt.xlabel("Date")
plt.ylabel("CPI")
plt.axvline(x=df['ds'].iloc[-1], color='r', linestyle='--', label="Forecast Start")
plt.legend()
plt.grid(True)

# Save the plot to a PNG file
plt.savefig('cpi_forecast.png')
plt.close()  # Close the plot after saving

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

# -----------------------------
# Investment Return Calculator
# -----------------------------
# Get user inputs for investment details
investment_amount_fd = float(input("Enter the investment amount for FD (₹): "))
investment_amount_rd = float(input("Enter monthly investment amount for RD (₹): "))
rd_return = float(input("Enter the RD interest rate (%): "))
fd_return = float(input("Enter the FD interest rate (%): "))

years_options = [1, 3, 5]
for years in years_options:
    # Get current CPI and previous CPI for each year iteration
    current_cpi = forecast[forecast['ds'] == df['ds'].iloc[-1] + pd.DateOffset(years=years)]['yhat'].values[0]
    previous_cpi = forecast[forecast['ds'] == df['ds'].iloc[-1] + pd.DateOffset(years=years-1)]['yhat'].values[0]

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
