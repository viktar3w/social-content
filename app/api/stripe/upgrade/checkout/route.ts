import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { DEFAULT_LENGTH_AI } from "@/consts/settings";

export const POST = async () => {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user || !user?.emailAddresses?.[0].emailAddress) {
      return new NextResponse("User not authenticated", { status: 401 });
    }
    await db.purchase.create({
      data: {
        userId,
        credit: DEFAULT_LENGTH_AI,
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
      await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const product = await stripe.products.create({
      name: "10,000 AI Credit",
      description: "all $10 worth of credit",
      default_price_data: {
        currency: "USD",
        unit_amount: 1000,
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
      cancel_url: process.env.NEXT_PUBLIC_SERVER_URL,
      payment_method_types: ["card"],
      mode: "payment",
      metadata: {
        userId: userId,
      },
      line_items: [{ price: product.default_price as string, quantity: 1 }],
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (err: any) {
    console.log("[ERROR] ", err);
    return new NextResponse("User not authenticated", { status: 500 });
  }
};
