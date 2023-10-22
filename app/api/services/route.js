import Stripe from "stripe";

export async function GET() {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  const productPriceData = await stripe.prices.list({
    expand: ["data.product"],
  });

  return Response.json({ productPriceData });
}
