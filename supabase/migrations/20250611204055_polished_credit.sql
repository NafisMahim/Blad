-- ────────── Stripe Integration (full schema + view) ───────────────────────

-- 1) Customers table
DROP TABLE IF EXISTS public.stripe_customers CASCADE;
CREATE TABLE public.stripe_customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Subscriptions table
DROP TABLE IF EXISTS public.stripe_subscriptions CASCADE;
CREATE TABLE public.stripe_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL,
  price_id TEXT,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) Enable Row Level Security
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- 4) Policies
CREATE POLICY "Users can view their own customer data"
  ON public.stripe_customers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own subscription data"
  ON public.stripe_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- 5) View: stripe_user_subscriptions
DROP VIEW IF EXISTS public.stripe_user_subscriptions CASCADE;
CREATE OR REPLACE VIEW public.stripe_user_subscriptions AS
SELECT
  sc.id                    AS user_id,
  ss.stripe_subscription_id,
  ss.status,
  ss.price_id,
  ss.current_period_start,
  ss.current_period_end,
  ss.cancel_at_period_end
FROM
  public.stripe_customers sc
LEFT JOIN
  public.stripe_subscriptions ss
    ON ss.user_id = sc.id;

-- 6) Grant read‐only access to the view
GRANT SELECT ON public.stripe_user_subscriptions TO authenticated;
GRANT SELECT ON public.stripe_user_subscriptions TO service_role;
