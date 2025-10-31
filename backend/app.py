from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Configuration
WORQHAT_API_URL = 'https://api.worqhat.com/flows/file/40d88f7f-8f87-4990-9768-73eca6ed99f9'
WORQHAT_CSV_API_URL = 'https://api.worqhat.com/flows/file/478a5489-85f4-4884-b35c-f8538f5d6a3c'
WORQHAT_NEW_CSV_API_URL = 'https://api.worqhat.com/flows/file/195a9ad8-b230-4101-83d8-5dd4fa885c96'
WORQHAT_API_KEY = 'wh_mhdmwx3bpUDhmAu5iAvCldIl7Aqxik89ulFBzhS'

@app.route('/')
def home():
    return jsonify({"message": "Invoice Processing API is running!"})

@app.route('/api/upload-invoice', methods=['POST'])
def upload_invoice():
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check if it's a PDF
        if not file.filename.lower().endswith('.pdf'):
            return jsonify({"error": "Only PDF files are allowed"}), 400
        
        # Get recipient email from form data (required)
        recipient_email = request.form.get('recipientAddress')
        if not recipient_email:
            return jsonify({"error": "recipientAddress is required"}), 400
        
        # Get sender name from form data (optional, default provided)
        sender_name = request.form.get('senderName', 'rutvikkale2006@gmail.com')
        
        # Prepare the request to Worqhat
        headers = {
            'Authorization': f'Bearer {WORQHAT_API_KEY}'
        }
        
        # Send file to Worqhat workflow
        files = {
            'file': (file.filename, file.stream, 'application/pdf')
        }
        
        data = {
            'senderName': sender_name,
            'recipientAddress': recipient_email,
            'pdf': 'invoice',
            'image': 'invoice_image'
        }
        
        # Make request to Worqhat
        response = requests.post(
            WORQHAT_API_URL,
            files=files,
            data=data,
            headers=headers
        )
        
        # Return response from Worqhat
        return jsonify({
            "status": "success",
            "message": "Invoice processed successfully",
            "worqhat_response": response.json() if response.headers.get('content-type') == 'application/json' else response.text,
            "status_code": response.status_code
        }), response.status_code
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/upload-feedback', methods=['POST'])
def upload_feedback():
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check if it's a CSV
        if not file.filename.lower().endswith('.csv'):
            return jsonify({"error": "Only CSV files are allowed"}), 400
        
        # Get recipient email from form data (required)
        recipient_email = request.form.get('recipientEmail')
        if not recipient_email:
            return jsonify({"error": "recipientEmail is required"}), 400
        
        # Prepare the request to Worqhat
        headers = {
            'Authorization': f'Bearer {WORQHAT_API_KEY}'
        }
        
        # Send CSV file to Worqhat workflow
        files = {
            'file': (file.filename, file.stream, 'text/csv')
        }
        
        data = {
            'recipientEmail': recipient_email
        }
        
        # Debug logging
        print(f"Sending to Worqhat (Feedback): recipientEmail={recipient_email}")
        
        # Make request to Worqhat
        response = requests.post(
            WORQHAT_CSV_API_URL,
            files=files,
            data=data,
            headers=headers
        )
        
        # Debug response
        print(f"Worqhat response status: {response.status_code}")
        print(f"Worqhat response: {response.text}")
        
        # Return response from Worqhat
        return jsonify({
            "status": "success",
            "message": "Feedback CSV processed successfully and top priority feedbacks sent to email",
            "worqhat_response": response.json() if response.headers.get('content-type') == 'application/json' else response.text,
            "status_code": response.status_code
        }), response.status_code
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/process-csv', methods=['POST'])
def process_csv():
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check if it's a CSV
        if not file.filename.lower().endswith('.csv'):
            return jsonify({"error": "Only CSV files are allowed"}), 400
        
        # Get recipient email from form data (required)
        recipient_email = request.form.get('recipientEmail')
        if not recipient_email:
            return jsonify({"error": "recipientEmail is required"}), 400
        
        # Prepare the request to Worqhat
        headers = {
            'Authorization': f'Bearer {WORQHAT_API_KEY}'
        }
        
        # Send CSV file to Worqhat workflow
        files = {
            'file': (file.filename, file.stream, 'text/csv')
        }
        
        data = {
            'recipientEmail': recipient_email
        }
        
        # Debug logging
        print(f"Sending to Worqhat: recipientEmail={recipient_email}")
        
        # Make request to Worqhat using new API endpoint
        response = requests.post(
            WORQHAT_NEW_CSV_API_URL,
            files=files,
            data=data,
            headers=headers
        )
        
        # Debug response
        print(f"Worqhat response status: {response.status_code}")
        print(f"Worqhat response: {response.text}")
        
        # Return response from Worqhat
        return jsonify({
            "status": "success",
            "message": "CSV processed successfully",
            "worqhat_response": response.json() if response.headers.get('content-type') == 'application/json' else response.text,
            "status_code": response.status_code
        }), response.status_code
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)