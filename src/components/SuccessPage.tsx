import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { checkSubscription } from '../lib/stripe';

const SuccessPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        const result = await checkSubscription();
        setIsSubscribed(result.isSubscribed);
      } catch (error) {
        console.error('Error verifying subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    verifySubscription();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-500/20 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          {isSubscribed ? 'Welcome to Pro!' : 'Payment Successful!'}
        </h1>
        
        <p className="text-gray-300 mb-8">
          {isSubscribed 
            ? 'Your subscription is now active. You have full access to all premium features.'
            : 'Your payment has been processed successfully.'}
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black 
                   font-semibold rounded-lg hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 
                   shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40"
        >
          <span>Start Creating</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;