-- 00000000000000_stripe_setup.sql

-- 1) STRIPE CUSTOMERS
CREATE TABLE IF NOT EXISTS public.stripe_customers (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id  TEXT UNIQUE NOT NULL,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now(),
  deleted_at          TIMESTAMPTZ
);

-- 2) STRIPE SUBSCRIPTIONS
CREATE TABLE IF NOT EXISTS public.stripe_subscriptions (
  id                      TEXT PRIMARY KEY,                          -- Stripe subscription ID
  customer_id             TEXT NOT NULL REFERENCES public.stripe_customers(stripe_customer_id) ON DELETE CASCADE,
  price_id                TEXT,
  status                  TEXT NOT NULL,
  current_period_start    TIMESTAMPTZ,
  current_period_end      TIMESTAMPTZ,
  cancel_at_period_end    BOOLEAN DEFAULT false,
  created_at              TIMESTAMPTZ DEFAULT now(),
  updated_at              TIMESTAMPTZ DEFAULT now(),
  deleted_at              TIMESTAMPTZ
);

-- 3) ENABLE RLS
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;

-- 4) RLS POLICIES
CREATE POLICY "Customers: user can view own"
  ON public.stripe_customers FOR SELECT
  USING (id = auth.uid() AND deleted_at IS NULL);

CREATE POLICY "Subscriptions: user can view own"
  ON public.stripe_subscriptions FOR SELECT
  USING (
    customer_id IN (
      SELECT stripe_customer_id
      FROM public.stripe_customers
      WHERE id = auth.uid() AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- 5) VIEW: stripe_user_subscriptions
DROP VIEW IF EXISTS public.stripe_user_subscriptions CASCADE;
CREATE VIEW public.stripe_user_subscriptions AS
SELECT
  c.id                       AS user_id,              -- your Supabase user ID
  c.stripe_customer_id       AS customer_id,
  s.id                       AS subscription_id,
  s.status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end
FROM
  public.stripe_customers c
LEFT JOIN
  public.stripe_subscriptions s
    ON s.customer_id = c.stripe_customer_id
WHERE
  c.deleted_at IS NULL
  AND (s.deleted_at IS NULL OR s.deleted_at IS NULL);

-- 6) GRANT VIEW ACCESS
GRANT SELECT ON public.stripe_user_subscriptions TO authenticated;
GRANT SELECT ON public.stripe_user_subscriptions TO service_role;
