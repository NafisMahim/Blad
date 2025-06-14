-- polished_credit.sql

-- Create view for subscription lookup
DROP VIEW IF EXISTS stripe_user_subscriptions CASCADE;

CREATE OR REPLACE VIEW stripe_user_subscriptions AS
SELECT
  sc.user_id AS customer_id,
  ss.id AS subscription_id,
  ss.status AS subscription_status,
  ss.price_id
FROM
  stripe_customers sc
  LEFT JOIN stripe_subscriptions ss ON ss.customer_id = sc.customer_id
WHERE
  sc.deleted_at IS NULL
  AND ss.deleted_at IS NULL;

-- Grant view access
GRANT SELECT ON stripe_user_subscriptions TO authenticated;
GRANT SELECT ON stripe_user_subscriptions TO service_role;
