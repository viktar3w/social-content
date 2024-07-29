import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { DEFAULT_LENGTH_AI } from "@/consts/settings";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    console.log("[verifyHeader] ", stripe.webhooks.signature.verifyHeader(body, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!))
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!,
    );
    console.log("[event] ", event.type);
    const session = event?.data?.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    if (!userId) {
      return NextResponse.json({ error: "Invalid session" }, { status: 400 });
    }
    if (event.type === "checkout.session.completed") {
      const user = await db.user.findUnique({
        where: {
          userId,
        },
      });
      if (!user) {
        await db.user.create({
          data: {
            userId,
            totalCredit: DEFAULT_LENGTH_AI + DEFAULT_LENGTH_AI,
          },
        });
      } else {
        await db.user.update({
          where: {
            userId,
          },
          data: {
            totalCredit: user.totalCredit + DEFAULT_LENGTH_AI,
          },
        });
      }
      return NextResponse.json({ ok: true });
    }
  } catch (err: any) {
    console.log("[ERROR] ", err);
    return NextResponse.json({ error: "Something was wrong" }, { status: 400 });
  }
  return new NextResponse("Invalid event");
}
