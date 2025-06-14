-- Create enum types if they don't exist
CREATE TYPE IF NOT EXISTS stripe_subscription_status AS ENUM (
  'not_started', 'incomplete', 'incomplete_expired', 'trialing', 
  'active', 'past_due', 'canceled', 'unpaid', 'paused'
);

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Create stripe_subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id TEXT PRIMARY KEY,
  customer_id TEXT NOT NULL,
  price_id TEXT,
  status stripe_subscription_status NOT NULL,
  current_period_start BIGINT,
  current_period_end BIGINT,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Create view for easy subscription status lookup
CREATE OR REPLACE VIEW stripe_user_subscriptions AS
SELECT
  sc.user_id AS customer_id,
  ss.id AS subscription_id,
  ss.status AS subscription_status,
  ss.price_id
FROM
  stripe_customers sc
  LEFT JOIN stripe_subscriptions ss ON sc.customer_id = ss.customer_id
WHERE
  sc.deleted_at IS NULL
  AND (ss.deleted_at IS NULL OR ss.deleted_at IS NULL);

-- Enable RLS on tables
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING ((user_id = auth.uid()) AND (deleted_at IS NULL));

CREATE POLICY "Users can view their own subscription data"
  ON stripe_subscriptions
  FOR SELECT
  TO authenticated
  USING ((customer_id IN (
    SELECT customer_id
    FROM stripe_customers
    WHERE user_id = auth.uid() AND deleted_at IS NULL
  )) AND (deleted_at IS NULL));