import React, { useState } from 'react';
import { Upload, DollarSign, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function Finance() {
  const [file, setFile] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.toLowerCase().endsWith('.csv')) {
        setFile(droppedFile);
        setUploadStatus(null);
      } else {
        setUploadStatus({ type: 'error', message: 'Please upload a CSV file' });
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.name.toLowerCase().endsWith('.csv')) {
        setFile(selectedFile);
        setUploadStatus(null);
      } else {
        setUploadStatus({ type: 'error', message: 'Please upload a CSV file' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadStatus({ type: 'error', message: 'Please select a CSV file' });
      return;
    }
    
    if (!recipientEmail) {
      setUploadStatus({ type: 'error', message: 'Please enter recipient email' });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('recipientAddress', recipientEmail);


    try {
      const response = await fetch('http://localhost:5000/api/process-csv', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus({
          type: 'success',
          message: 'CSV processed successfully! Results sent to ' + recipientEmail
        });
        setFile(null);
        setRecipientEmail('');
      } else {
        setUploadStatus({
          type: 'error',
          message: data.error || 'Failed to process CSV'
        });
      }
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Failed to connect to server'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      <div className="max-w-3xl mx-auto py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-3xl mb-4 shadow-xl">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Finance Team Portal</h1>
          <p className="text-gray-600">Upload CSV files for financial processing</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
              dragActive
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {file ? file.name : 'Drop CSV file here or click to upload'}
              </p>
              <p className="text-sm text-gray-500">Only CSV files are accepted</p>
            </label>
          </div>

          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Email Address
            </label>
            <input
              type="email"
              id="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="finance@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={uploading || !file || !recipientEmail}
            className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Process CSV File
              </>
            )}
          </button>

          {uploadStatus && (
            <div
              className={`mt-6 p-4 rounded-xl flex items-start ${
                uploadStatus.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {uploadStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  uploadStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}
              >
                {uploadStatus.message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-3">How it works:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Upload your financial data CSV file
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Enter the recipient email address
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Our AI processes the data and sends results to the specified email
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}