import React, { useEffect, useState } from 'react';
import { Crown, Loader } from 'lucide-react';
import { checkSubscription } from '../lib/stripe';
import { getProductByPriceId } from '../stripe-config';

const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<{
    isSubscribed: boolean;
    status?: string;
    priceId?: string;
    loading: boolean;
    error?: any;
  }>({
    isSubscribed: false,
    loading: true
  });

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const result = await checkSubscription();
        setSubscription({
          ...result,
          loading: false
        });
      } catch (error) {
        setSubscription({
          isSubscribed: false,
          loading: false,
          error
        });
      }
    };

    fetchSubscription();
  }, []);

  if (subscription.loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-400">
        <Loader className="w-4 h-4 animate-spin" />
        <span>Checking subscription...</span>
      </div>
    );
  }

  if (!subscription.isSubscribed) {
    return null;
  }

  // Get product details based on price ID
  const product = subscription.priceId ? getProductByPriceId(subscription.priceId) : null;

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
        <Crown className="w-3 h-3" />
        <span>{product?.name || 'Pro Plan'}</span>
      </div>
    </div>
  );
};

export default SubscriptionStatus;