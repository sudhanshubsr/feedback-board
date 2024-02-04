import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth.js";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const priceId = "price_1OgDxBSBSvqRwNociu5zIuhR";
  const usersession = await getServerSession(authOptions);
  const stripesession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: process.env.NEXTAUTH_URL + "/subscription?success=1",
    cancel_url: process.env.NEXTAUTH_URL + "/subscription?cancel=1",
    metadata: {
      userEmail: usersession?.user?.email,
      address: "IN",
    },
    subscription_data: {
      metadata: {
        userEmail: usersession?.user?.email,
        

    },
  },
  });

  return Response.json(stripesession.url);
}
