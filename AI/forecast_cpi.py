import pandas as pd
from prophet import Prophet
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv("CPI.csv")
df['Date'] = pd.to_datetime(df['Year'].astype(str) + '-' + df['Month'], format='%Y-%B')
df = df[['Date', 'Combined']].rename(columns={'Date': 'ds', 'Combined': 'y'})

# Fit the Prophet model
model = Prophet()
model.fit(df)

# Forecasting future CPI for 5 years (monthly)
future = model.make_future_dataframe(periods=60, freq='MS')  # 60 months = 5 years
forecast = model.predict(future)

# Creating a DataFrame with future Year, Month (text), and Forecasted CPI
forecast['Year'] = forecast['ds'].dt.year
forecast['Month'] = forecast['ds'].dt.strftime('%B')  # Convert to month name
forecast['Forecasted_CPI'] = forecast['yhat'].round(2)  # Round CPI to 2 decimal places

# Filter out the forecasted data for the future years (after the training data)
future_forecast = forecast[forecast['ds'] > df['ds'].max()]

# Drop the 'ds' column as it's no longer needed
final_df = future_forecast[['Year', 'Month', 'Forecasted_CPI']]

# Save the final DataFrame to a CSV
final_df.to_csv("forecasted_CPI.csv", index=False)

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

print("Forecasting completed and saved to 'forecasted_CPI.csv'.")
