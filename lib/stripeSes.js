import { stripe } from "@/lib/get-stripejs";
import { redirect } from "next/navigation";
import { useCookies } from "react-cookie";

export async function createCheckoutSession() {
  const [cookies, setCookie] = useCookies(["appointment"]);

  const item = {
    price: cookies.PriceID,
    quantity: cookies.Duration ? Number(cookies.Duration) : 1,
  };

  const checkoutSession = stripe.checkout.sessions.create({
    mode: "payment",
    lineItems: [item],
    success_url: `${req.headers.origin}/book-appointment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/book-appointment/cancel?session_id={CHECKOUT_SESSION_ID}`,
  });

  redirect(checkoutSession.url);
}
/*
export async function createPaymentIntent() {
  const [cookies, setCookie] = useCookies(["appointment"]);

  const quantity = cookies.Duration ? Number(cookies.Duration) : 1;

  const total = quantity * Number(cookies.Price);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    automatic_payment_methods: { enabled: true },
    currency: "usd",
  });

  return { client_secret: paymentIntent.client_secret };
}
*/
