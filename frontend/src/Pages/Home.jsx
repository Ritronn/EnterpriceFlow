import React from 'react';
import { FileText, MessageSquare, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">EnterpriseFlow</h1>
          <p className="text-xl text-gray-600">Enterprise workflow management</p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Billing Team Card */}
          <div 
            onClick={() => navigate('/billing')}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Billing Team</h2>
            <p className="text-gray-600 mb-6">
              Upload and process invoices. Send invoices directly to the billing team for review and processing.
            </p>
            <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Go to Billing Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Product Team Card */}
          <div 
            onClick={() => navigate('/product')}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-6 shadow-lg">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Product Team</h2>
            <p className="text-gray-600 mb-6">
              Upload customer feedback CSV files. Analyze and send top priority feedbacks to the product team.
            </p>
            <button className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors">
              Go to Product Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Finance Team Card */}
          <div 
            onClick={() => navigate('/finance')}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Finance Team</h2>
            <p className="text-gray-600 mb-6">
              Upload financial data CSV files. Process and analyze financial data with AI-powered insights.
            </p>
            <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
              Go to Finance Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-12">
          Powered by Worqhat AI • Secure & Fast
        </p>
      </div>
    </div>
  );
}