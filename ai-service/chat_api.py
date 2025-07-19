from flask import Flask, request, jsonify
import openai
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Set your OpenAI API key securely
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Pawli, a friendly pet care assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        ai_message = response.choices[0].message["content"].strip()
        return jsonify({"response": ai_message})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
