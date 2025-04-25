from scipy.optimize import minimize

def investment_allocation(user_income, risk_capacity, investment_duration):
    """
    Generate an investment allocation recommendation using linear programming with Recurring Deposits.
    Uses scipy.optimize instead of pulp.
    
    Parameters:
    - user_income: Annual income of the user
    - risk_capacity: "low", "medium", or "high"
    - investment_duration: Investment horizon in years
    
    Returns:
    - A dictionary with allocation percentages.
    """
    
    # Set expected returns based on risk capacity
    if risk_capacity.lower() == 'low':
        returns = [0.06, 0.04, 0.05, 0.055]  # Mutual, Gold, FD, RD
        bounds = [(0, 0.2), (0.3, 1), (0.2, 1), (0.3, 1)]
    elif risk_capacity.lower() == 'medium':
        returns = [0.08, 0.05, 0.04, 0.06]
        bounds = [(0, 0.5), (0.2, 1), (0.1, 1), (0.2, 1)]
    else:  # high
        returns = [0.10, 0.06, 0.03, 0.065]
        bounds = [(0, 0.7), (0.1, 1), (0.1, 1), (0.1, 1)]

    # Duration-based minimums adjustment (affects Gold and FD)
    if 1 <= investment_duration < 5:
        bounds[1] = (max(bounds[1][0], 0.15), bounds[1][1])  # Gold
        bounds[2] = (max(bounds[2][0], 0.15), bounds[2][1])  # FD
    elif 5 <= investment_duration < 10:
        bounds[1] = (max(bounds[1][0], 0.2), bounds[1][1])   # Gold
        bounds[2] = (max(bounds[2][0], 0.2), bounds[2][1])   # FD
    elif investment_duration >= 10 and risk_capacity.lower() == "low":
        bounds[1] = (max(bounds[1][0], 0.3), bounds[1][1])   # Gold
        bounds[2] = (max(bounds[2][0], 0.25), bounds[2][1])  # FD

    # Objective: minimize negative return => maximize return
    def objective(x):
        return -sum(x[i] * returns[i] for i in range(4))

    # Constraint: Total allocation = 1
    constraints = [{'type': 'eq', 'fun': lambda x: sum(x) - 1}]

    # Initial guess
    x0 = [0.25, 0.25, 0.25, 0.25]

    # Solve
    result = minimize(objective, x0, bounds=bounds, constraints=constraints)

    if not result.success:
        raise ValueError("Optimization failed: " + result.message)

    allocation = {
        "Mutual Funds": round(float(result.x[0]), 2),#convert numpy float to regular float
        "Gold": round(float(result.x[1]), 2),
        "Fixed Deposits": round(float(result.x[2]), 2),
        "Recurring Deposits": round(float(result.x[3]), 2),
        "Income": user_income
    }

    return allocation

# Example usage:
print(investment_allocation(100000, "low", 10))
