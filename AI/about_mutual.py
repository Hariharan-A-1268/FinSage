import pandas as pd
import requests
import urllib.parse
# df=pd.read_csv("Kuvera_Fund_Details.csv")
# name=input("Enter mutual fund name:")
# df=df[df["name"==name]]
ISIN_NUMBER="INF846K01VJ3"
data=dict()
url = f"https://mf.captnemo.in/kuvera/{ISIN_NUMBER}"
try:
    res = requests.get(url,verify=False)
    if res.status_code != 200:
        print(f"Failed to fetch for {ISIN_NUMBER}")

    fund_data = res.json()
    data=fund_data[0]
except Exception as e:
    print(f"Error for ISIN {ISIN_NUMBER}: {e}")
    quit()
#what is it.Should be fixed.
def explain_and_summarize_fund(fund):
    def get_safe(data, default='N/A'):
        return data if data is not None else default

    def interpret_return(value):
        if isinstance(value, (int, float)):
            if value >= 15:
                return "✅ Excellent return. Shows strong performance over time."
            elif value >= 10:
                return "✅ Good return. Better than average."
            elif value >= 7:
                return "🟡 Moderate return. Decent if it stays consistent."
            else:
                return "🔻 Low return. Could underperform compared to peers."
        return "⚠️ Return not available."

    def interpret_volatility(vol):
        if not isinstance(vol, (int, float)):
            return "⚠️ Volatility data not available."
        elif vol < 10:
            return "✅ Low volatility. Your investment stays relatively stable."
        elif vol < 20:
            return "🟡 Moderate volatility. Some ups and downs—manageable risk."
        else:
            return "🔻 High volatility. Be ready for big swings in your investment."

    def interpret_expense_ratio(expense):
        if not isinstance(expense, (int, float)):
            return "⚠️ Expense ratio unavailable."
        elif expense < 0.5:
            return "✅ Low cost. Most of your money stays invested."
        elif expense < 1:
            return "🟡 Slightly high. Some of your return goes into fees."
        else:
            return "🔻 Expensive. High fees can eat into profits."

    def interpret_info_ratio(ratio):
        if not isinstance(ratio, (int, float)):
            return "⚠️ Info Ratio not available."
        elif ratio > 0.5:
            return "✅ Consistently beats its benchmark after adjusting for risk."
        elif ratio > 0:
            return "🟡 Performs reasonably better than benchmark with some risks."
        else:
            return "🔻 Poor at delivering extra returns for the risk it takes."

    def interpret_rating(rating):
        if isinstance(rating, int):
            if rating >= 4:
                return "✅ Highly rated by analysts. Good historical track record."
            elif rating == 3:
                return "🟡 Average rating. Might want to compare with other funds."
            elif rating > 0:
                return "🔻 Low rated. Not a top performer."
        return "⚠️ No rating data available."

    def build_quick_summary():
        highlights = []
        if isinstance(year_3, (int, float)) and year_3 >= 12:
            highlights.append("📈 Strong 3-year returns")
        if isinstance(volatility, (int, float)) and volatility < 10:
            highlights.append("🛡️ Low volatility")
        if isinstance(expense_ratio, (int, float)) and expense_ratio < 0.75:
            highlights.append("💸 Low expense ratio")
        if isinstance(info_ratio, (int, float)) and info_ratio > 0.5:
            highlights.append("📊 Great info ratio (beats benchmark)")
        if isinstance(fund_rating, int) and fund_rating >= 4:
            highlights.append("⭐ Highly rated")
        if not highlights:
            highlights.append("ℹ️ No standout features, needs deeper review.")
        return highlights

    def build_should_you_invest():
        reasons = []
        if isinstance(year_3, (int, float)) and year_3 >= 12:
            reasons.append("has delivered solid medium-term performance")
        if isinstance(volatility, (int, float)) and volatility < 10:
            reasons.append("maintains a low volatility profile")
        if isinstance(expense_ratio, (int, float)) and expense_ratio < 0.75:
            reasons.append("keeps costs investor-friendly")
        if isinstance(info_ratio, (int, float)) and info_ratio > 0.5:
            reasons.append("consistently outperforms its benchmark after adjusting for risk")
        if isinstance(fund_rating, int) and fund_rating >= 4:
            reasons.append("is highly rated for consistent returns")

        if reasons:
            return {
                "verdict": "👍 Recommended",
                "reasons": reasons,
                "note": "It may be suitable if you’re looking for long-term growth with manageable risk."
            }
        return {
            "verdict": "🤔 Not recommended",
            "reasons": ["Doesn’t stand out on key metrics right now"],
            "note": "You may want to compare it with others before investing."
        }
    
    def generate_google_news_url(fund_name):
        """
        Returns a Google News search URL for the mutual fund.
        Example: 'Axis Bluechip Fund Direct Plan Growth' =>
                https://news.google.com/search?q=Axis+Bluechip+Fund+Direct+Plan+Growth
        """
        if not fund_name:
            return "⚠️ Fund name not provided."

        query = urllib.parse.quote_plus(fund_name)
        return f"https://news.google.com/search?q={query}"
    
    returns = fund.get("returns", {})
    comparison = fund.get("comparison", [{}])[0]

    year_1 = returns.get('year_1')
    year_3 = returns.get('year_3')
    year_5 = returns.get('year_5')
    inception = returns.get('inception')

    volatility = fund.get('volatility')
    expense_ratio = fund.get('expense_ratio')
    info_ratio = comparison.get('info_ratio')
    fund_rating = fund.get('fund_rating')

    return {
        "fund_name": fund.get('short_name', 'N/A'),
        "quick_summary": build_quick_summary(),
        "should_you_invest": build_should_you_invest(),
        "details": {
            "category": {
                "value": get_safe(fund.get('fund_category')),
                "note": "🧠 Category tells you what style the fund follows."
            },
            "type": {
                "value": get_safe(fund.get('fund_type')),
                "note": "🧠 Fund type affects how liquid your investment is."
            },
            "start_date": {
                "value": get_safe(fund.get('start_date')),
                "note": "🧠 Older funds have a longer track record, which helps assess their stability and performance."
            },
            "returns": {
                "1_year": {
                    "value": year_1,
                    "analysis": interpret_return(year_1),
                    "note": "🧠 Shows recent performance. Useful for short-term outlook."
                },
                "3_year": {
                    "value": year_3,
                    "analysis": interpret_return(year_3),
                    "note": "🧠 Medium-term return. Good benchmark for consistent funds."
                },
                "5_year": {
                    "value": year_5,
                    "analysis": interpret_return(year_5),
                    "note": "🧠 Long-term return. Important for goal-based investing."
                },
                "inception": {
                    "value": inception,
                    "note": "🧠 This is the average return since the fund started."
                }
            },
            "volatility": {
                "value": volatility,
                "analysis": interpret_volatility(volatility),
                "note": "🧠 Volatility means how much the fund's value moves up or down."
            },
            "info_ratio": {
                "value": info_ratio,
                "analysis": interpret_info_ratio(info_ratio),
                "note": "🧠 Shows how well the fund performs compared to its benchmark after risk adjustment."
            },
            "aum": {
                "value": fund.get("aum"),
                "note": "🧠 Total money invested in the fund. High AUM shows popularity but might affect flexibility."
            },
            "expense_ratio": {
                "value": expense_ratio,
                "analysis": interpret_expense_ratio(float(expense_ratio)),
                "note": "🧠 Annual fee charged by the fund. Lower is usually better."
            },
            "crisil_rating": {
                "value": get_safe(fund.get("crisil_rating")),
                "note": "🧠 A third-party rating that indicates overall performance"
            },
            "fund_rating": {
                "value": fund_rating,
                "stars": '★' * int(fund_rating) if fund_rating else 'N/A',
                "analysis": interpret_rating(fund_rating),
                "note": "🧠 Based on past returns, risk profile, and consistency."
            },
            "investment_options": {
                "lumpsum": {
                    "available": fund.get('lump_available') == 'Y',
                    "minimum": fund.get('lump_min', 0),
                    "note": "🧠 Lumpsum is useful if you want to invest a large amount upfront"
                },
                "sip": {
                    "available": fund.get('sip_available') == 'Y',
                    "minimum": fund.get('sip_min', 0),
                    "note": "🧠 SIPs let you invest small amounts monthly."
                }
            },
            "more_info_url": get_safe(generate_google_news_url(fund.get('name')))
        }
    }
print(explain_and_summarize_fund(data))