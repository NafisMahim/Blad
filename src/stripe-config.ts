// Stripe product configuration
export const products = [
  {
    name: 'Pro Plan — NexusAI Access',
    priceId: 'price_1RYfLQACZYrdFwrXSy38VoEl',
    description: 'Full access to all 80+ premium tools, including startup generators, pitch creators, product builders, and revenue boosters.',
    price: '$25.99',
    mode: 'subscription',
    features: [
      'Unlimited ad generations',
      '80+ premium AI tools',
      'Advanced viral marketing features',
      'Startup generators & pitch creators',
      'Product builders & revenue boosters',
      'Priority support',
      'Cancel anytime'
    ]
  }
];

// Get product by price ID
export const getProductByPriceId = (priceId: string) => {
  return products.find(product => product.priceId === priceId);
};