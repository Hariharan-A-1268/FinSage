from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# Replace with your actual values
AZURE_OPENAI_ENDPOINT = "AZURE_OPENAI_ENDPOINT"
SUBSCRIPTION_KEY = "SUBSCRIPTION_KEY"

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")

    headers = {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY
    }

    payload = {
        "messages": [
            {"role": "user", "content": user_input}
        ],
    }

    try:
        response = requests.post(AZURE_OPENAI_ENDPOINT, headers=headers, json=payload, verify=False)
        response.raise_for_status()
        gpt_reply = response.json()["choices"][0]["message"]["content"]
        return jsonify({"reply": gpt_reply})
    except requests.exceptions.RequestException as e:
        print("Azure API error:", e)
        return jsonify({"error": "Failed to fetch response from Azure OpenAI."}), 500

# Allow CORS for local development
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    return response

if __name__ == "__main__":
    app.run(debug=True, port=5001)
