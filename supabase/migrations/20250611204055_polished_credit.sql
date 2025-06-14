DROP VIEW IF EXISTS stripe_user_subscriptions CASCADE;

CREATE OR REPLACE VIEW stripe_user_subscriptions AS
SELECT
  sc.user_id,
  ss.stripe_subscription_id,
  ss.status,
  ss.price_id,
  ss.current_period_start,
  ss.current_period_end,
  ss.cancel_at_period_end
FROM
  stripe_customers sc
LEFT JOIN stripe_subscriptions ss ON ss.user_id = sc.id
WHERE
  sc.deleted_at IS NULL
  AND (ss.deleted_at IS NULL OR ss.deleted_at IS NULL);

GRANT SELECT ON stripe_user_subscriptions TO authenticated;
GRANT SELECT ON stripe_user_subscriptions TO service_role;
