import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user || !user?.emailAddresses?.[0].emailAddress) {
      return new NextResponse("User not authenticated", { status: 401 });
    }
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "10,000 AI Credit",
            description: "all $10 worth of credit",
          },
          unit_amount: 1000,
        },
      },
    ];
    await db.purchase.create({
      data: {
        userId,
        credit: 10000,
      },
    });
    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });
      let stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer?.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
      cancel_url: process.env.NEXT_PUBLIC_SERVER_URL,
      metadata: {
        userId: userId,
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.log("[ERROR] ", err);
    return new NextResponse("User not authenticated", { status: 500 });
  }
};
