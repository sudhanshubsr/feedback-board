import { getServerSession } from "next-auth";
import prisma from "../../../prisma/index.js";
import { authOptions } from "../../utils/auth.js";



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req){
    const returnUrl = process.env.NEXTAUTH_URL + '/subscription';
    const userSession = await getServerSession(authOptions);
    if (!userSession) {
        return new Response('Unauthenticated', {status: 401});
    }
    const subscription = await prisma.subscription.findUnique({
        where:{
           userEmail: userSession.user.email 
        }
    })
    const customerId = subscription.customer;
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return Response.json(portalSession.url);
}