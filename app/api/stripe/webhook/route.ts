import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  const body = await req.text();
  const sig = headers().get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!,
    );
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    try {
      const user = await db.user.findUnique({
        where: {
          userId,
        },
      });
      if (!user) {
        await db.user.create({
          data: {
            userId,
            totalCredit: 10000 + 10000,
          },
        });
      } else {
        await db.user.update({
          where: {
            userId,
          },
          data: {
            totalCredit: user.totalCredit + 10000,
          },
        });
      }
      return NextResponse.json({ ok: true });
    } catch (err: any) {
      console.log("[ERROR] ", err);
      return new NextResponse("Invalid session", { status: 500 });
    }
  }
  return new NextResponse("Invalid event");
};
