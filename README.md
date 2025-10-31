# Business Automation Platform

AI-powered platform for processing invoices, analyzing feedback, and handling financial data using Worqhat AI workflows.

## Features

- **Invoice Processing** - Upload PDF invoices and send to billing team
- **Feedback Analysis** - Analyze customer feedback CSV and identify top priorities
- **Financial Processing** - Process financial CSV data with AI insights

## Tech Stack

**Backend:** Flask, Flask-CORS, Requests  
**Frontend:** React, React Router, Lucide React, Tailwind CSS  
**AI:** Worqhat API

## Setup

### Backend
```bash
pip install -r requirements.txt
python app.py
```
Server runs on `http://localhost:5000`

### Frontend
Live at: https://enterprice-flow.vercel.app

## API Endpoints

- `POST /api/upload-invoice` - Upload PDF invoice
- `POST /api/upload-feedback` - Upload feedback CSV
- `POST /api/process-csv` - Process financial CSV

## Configuration

Create a `.env` file and add your Worqhat API key:
```
WORQHAT_API_KEY=your_api_key_here
```

## Components

- `Billing.jsx` - Invoice processing page
- `Product.jsx` - Feedback analysis page
- `Finance.jsx` - Financial data processing page
