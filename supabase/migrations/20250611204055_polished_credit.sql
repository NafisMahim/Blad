-- 20250611204055_polished_credit.sql

-- stripe_user_subscriptions view only
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

-- Grant access on view
GRANT SELECT ON public.stripe_user_subscriptions TO authenticated;
GRANT SELECT ON public.stripe_user_subscriptions TO service_role;
