import pandas as pd
import json

# Function to filter by risk level and sort by the chosen year column
def filter_and_sort(df, risk_level, year_column):
    # Step 1: Filter funds by risk level (crisil_rating column)
    filtered_df = df[df['crisil_rating'] == risk_level]
    
    # Step 2: Sort the filtered DataFrame by the chosen year column in descending order
    sorted_df = filtered_df.sort_values(by=year_column, ascending=False)
    
    return sorted_df

# Main program to interact with the user
def get_mf_recommendations(year_column, risk_level):
    
    # Sample DataFrame (Replace this with your actual DataFrame)
    df = pd.read_csv("Mutual_Fund_Details.csv")
    df = df.drop(columns=["fund_rating"])
    df = df.dropna(subset=['last_nav', '1_year', '3_year', '5_year', 'crisil_rating', 'category'])

    # Filter and sort the data based on user input
    sorted_funds = filter_and_sort(df, risk_level, year_column)

    # Display the sorted funds as JSON
    if not sorted_funds.empty:
        
        # Uncomment below line for top 20 recommendations
        sorted_funds = sorted_funds.head(20)

        # Convert the sorted DataFrame to an array of JSON objects (one per fund)
        recommendations = sorted_funds.to_dict(orient='records')

        return recommendations
        
    else:
        return json.dumps({"message": f"No funds found for risk level: {risk_level}"}, indent=4)
