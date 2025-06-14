import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';

// Stripe publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

// Function to create a checkout session
export const createCheckoutSession = async (priceId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('You must be logged in to make a purchase');
    }

    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not found');
    }

    // Create a checkout session via the Supabase Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        price_id: priceId,
        success_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/`,
        mode: 'subscription',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId, url } = await response.json();
    
    // If we have a direct URL, redirect to it
    if (url) {
      window.location.href = url;
      return { sessionId, url };
    }
    
    // Otherwise use the Stripe.js redirect
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }
    
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }
    
    return { sessionId };
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Function to check if user has an active subscription
export const checkSubscription = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { isSubscribed: false };
    }
    
    // Use the updated view structure
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('status, price_id')
      .maybeSingle();
    
    if (error) {
      console.error('Error checking subscription:', error);
      return { isSubscribed: false, error };
    }
    
    const isSubscribed = data?.status === 'active' || 
                         data?.status === 'trialing';
    
    return { 
      isSubscribed, 
      status: data?.status,
      priceId: data?.price_id
    };
  } catch (error) {
    console.error('Error checking subscription:', error);
    return { isSubscribed: false, error };
  }
};