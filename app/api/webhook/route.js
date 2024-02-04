const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(req){
let data;
let eventType;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (webhookSecret) {
  let event;
  let signature = req.headers.get("stripe-signature");
  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      webhookSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return new Response('Webhook signature verification failed.', { status: 400 });
  }

  data = event.data;
  eventType = event.type;
} else {
  data = req.body.data;
  eventType = req.body.type;
}

switch (eventType) {
  case 'checkout.session.completed':
    break;
  case 'invoice.paid':
    break;
  case 'invoice.payment_failed':
    break;
  default:
}
console.log({eventType})
return new Response(null, { status: 200 });
}