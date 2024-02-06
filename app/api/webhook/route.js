import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../../utils/auth.js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
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
      return new Response("Webhook signature verification failed.", {
        status: 400,
      });
    }

    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "checkout.session.completed") {
    const { userEmail } = data.object.metadata;
    const { customer } = data.object;
    const subscription = await prisma.subscription.findUnique({
      where: {
        userEmail: userEmail,
      },
    });
    if (subscription) {
      await prisma.subscription.update({
        where: {
          userEmail: userEmail,
        },
        data: {
          customer: customer,
        },
      });
    } else {
      await prisma.subscription.create({
        data: {
          userEmail,
          customer,
        },
      });
    }
  }

  if (eventType === "customer.subscription.updated") {
    const { userEmail } = data.object.metadata;
    await prisma.subscription.update({
      where: {
        userEmail: userEmail,
      },
      data: {
        stripeSubscriptionData: data,
      },
    });
  }
  return new Response(null, { status: 200 });
}
