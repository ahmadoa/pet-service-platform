import { Stripe, loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
  }
  return stripePromise;
};

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default { getStripe, stripe };
