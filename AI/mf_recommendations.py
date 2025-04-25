import pandas as pd

# Sample DataFrame (Replace this with your actual DataFrame)
df = pd.read_csv("Kuvera_Fund_Details.csv")
df=df.drop(columns=["fund_rating"])
df= df.dropna(subset=['last_nav','1_year','3_year','5_year','crisil_rating','category'])
# Function to filter by risk level and sort by the chosen year column
def filter_and_sort(df, risk_level, year_column):
    # Step 1: Filter funds by risk level (crisil_rating column)
    filtered_df = df[df['crisil_rating'] == risk_level]
    
    # Step 2: Sort the filtered DataFrame by the chosen year column in descending order
    sorted_df = filtered_df.sort_values(by=year_column, ascending=False)
    
    return sorted_df

# Function to get valid user input for risk level
def get_risk_level_input():
    valid_risk_levels = [
        "Very High Risk", "Moderate Risk", "Low to Moderate Risk", 
        "Moderately High Risk", "Low Risk", "High Risk"
    ]
    
    while True:
        print("Choose a risk level:")
        for idx, risk in enumerate(valid_risk_levels, start=1):
            print(f"{idx}. {risk}")
        risk_input = input("Enter the number corresponding to your risk level: ").strip()

        if risk_input.isdigit():
            risk_input = int(risk_input)
            if 1 <= risk_input <= len(valid_risk_levels):
                return valid_risk_levels[risk_input - 1]
            else:
                print("Invalid choice. Please select a valid number.")
        else:
            print("Invalid input. Please enter a number.")

# Function to get valid user input for the year column
def get_year_input():
    while True:
        year_input = input("Enter number of years (1,3 and 5):")
        if year_input in ["1","3","5"]:
            return year_input+"_year"
        else:
            print("Invalid input. Please choose from '1_year', '3_year', or '5_year'.")

# Main program to interact with the user
def main():
    # Get user input
    risk_level = get_risk_level_input()
    year_column = get_year_input()

    # Filter and sort the data based on user input
    sorted_funds = filter_and_sort(df, risk_level, year_column)

    # Display the sorted funds
    if not sorted_funds.empty:
        print(f"\nFunds for risk level: {risk_level} sorted by {year_column} return stored in recommendations.json")
        
        #uncomment below line for top 5 recommendations
        #sorted_funds=sorted_funds.head()

        # Convert the sorted DataFrame to an array of JSON objects (one per fund)
        # Each row of the DataFrame will be converted into a JSON object
        recommendations = sorted_funds.to_dict(orient='records')
        
        # Save as JSON array in a file
        import json
        with open('recommendations.json', 'w') as f:
            json.dump(recommendations, f, indent=4)
    else:
        print(f"No funds found for risk level: {risk_level}")

# Run the program
main()
