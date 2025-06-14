DROP VIEW IF EXISTS public.stripe_user_subscriptions CASCADE;

CREATE OR REPLACE VIEW public.stripe_user_subscriptions AS
SELECT
  u.id                     AS user_id,
  sc.stripe_customer_id,
  ss.stripe_subscription_id,
  ss.status,
  ss.price_id,
  ss.current_period_start,
  ss.current_period_end,
  ss.cancel_at_period_end
FROM auth.users u
LEFT JOIN public.stripe_customers   sc ON u.id = sc.id
LEFT JOIN public.stripe_subscriptions ss ON u.id = ss.user_id;

GRANT SELECT
  ON public.stripe_user_subscriptions
  TO authenticated, service_role;