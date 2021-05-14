import Stripe from 'stripe'

const stripeSecret = 'OPTIONAL'; // NOT needed for only doing webhook signing secret
const payload = {}; // Paste your fake Stripe web hook body here
const stripe = new Stripe(stripeSecret, {apiVersion:'2020-08-27'})

/** Get your web hook signing signature
 * IF using stripe cli web hooks, just copy from your cli
 * IF using server for webhooks
 *   - goto stripe dashboard > developers > webhooks
 *   - select your server under "Endpoints receiving events from your account"
 *   - copy "Signing secret"
 *  */
const webhookSigningSecret = '...paste web hook signing secrete here...'

const headers = getStripeWebhookHeaders(
  webhookSigningSecret,
  payload
)

console.log('\n\nyour header.stripe-signature => ', headers)




function getStripeWebhookHeaders(
  webhookSigningSecret: string,
  payload: Record<string, any>
) {
  return {
    'stripe-signature': getStripeWebhookHeader(webhookSigningSecret, payload)
  }
}

function getStripeWebhookHeader(
  webhookSigningSecret: string,
  payload: Record<string, any>
) {
  const payloadString = JSON.stringify(payload);
  return stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: webhookSigningSecret,
  });
}
