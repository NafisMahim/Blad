-- polished_credit.sql

-- View: stripe_user_subscriptions
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

-- Grant read access
GRANT SELECT ON public.stripe_user_subscriptions TO authenticated;
GRANT SELECT ON public.stripe_user_subscriptions TO service_role;
