import sqlite3
import csv

# Step 1: Connect to SQLite Database (or create one)
conn = sqlite3.connect("innovate.db")  # Replace with your database name
cursor = conn.cursor()

# Step 2: Create a Table in SQLite
table_name = "future_CPI"  # Replace with your table name
# create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} (Year NUMERIC, Month TEXT, CPI NUMERIC);"
# # Replace column definitions with your actual table structure
# cursor.execute(create_table_query)

# Step 3: Open the CSV File
# csv_file_path = "forecasted_CPI.csv"  # Replace with the path to your CSV file
# with open(csv_file_path, "r") as csvfile:
#     csv_reader = csv.reader(csvfile)
#     headers = next(csv_reader)  # Assuming the first row is headers
    
#     # Step 4: Insert Data into the Table
#     for row in csv_reader:
#         insert_query = f"INSERT INTO {table_name} VALUES (?, ?, ?);"  # Adjust placeholders based on your columns
#         cursor.execute(insert_query, row)

# Delete rows where date has slashes
# cursor.execute("DELETE FROM future_gold WHERE date LIKE '%';")

# Step 5: Commit and Close
conn.commit()
conn.close()

print("Operation success!")
