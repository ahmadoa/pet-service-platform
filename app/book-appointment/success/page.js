"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Stripe from "stripe";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import SuccessAnim from "@/components/ui/successAnim";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

function Success() {
  const { user } = UserAuth();
  const router = useRouter();

  // get cookies
  const [cookies, setCookie, removeCookie] = useCookies(["appointment"]);
  const [loaded, setLoaded] = useState(false);

  // get session_id param
  const params = useSearchParams();

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  const session = params.get("session_id");

  const getSession = async (ses, cook) => {
    if (ses && cook) {
      const res = await stripe.checkout.sessions.retrieve(ses);
      if (res.payment_status === "paid") {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            profile: user.photoURL,
            username: user.displayName,
            href: `/dashboard/appointments?id=${res.payment_intent}`,
            orderId: res.payment_intent,
            priceId: cookies.PriceID,
            name: cookies.Name,
            breed: cookies.Breed,
            Allergies: cookies.Allergies,
            Service: cookies.Service,
            Date: cookies.Date,
            Duration: cookies.Duration,
            SpecialRequest: cookies.Special,
            PaymentStatus: res.payment_status,
            TotalPaid: res.amount_total,
            Status: "On Process",
          }),
        });
        if (response.ok) {
          const data = await response.json();
          removeCookie("Allergies", { path: "/" });
          removeCookie("Breed", { path: "/" });
          removeCookie("Date", { path: "/" });
          removeCookie("Duration", { path: "/" });
          removeCookie("Name", { path: "/" });
          removeCookie("PriceID", { path: "/" });
          removeCookie("Service", { path: "/" });
          removeCookie("Special", { path: "/" });
          console.log("data was added successfully");
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      }
      // add data to orders (user) & all orders with payment status = "on process" with a random unique doc id and user id
      // delete cookies
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (user != null) {
      setLoaded(true);
    }
    if (loaded) {
      getSession(session, cookies.Name);
    }
  }, [loaded, user]);

  // check user
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <div className="h-under-nav w-full relative overflow-hidden flex flex-col items-center justify-center text-center gap-5">
      <Image
        src={Logo}
        className="absolute -z-50 w-96 rotate-45 left-5 bottom-5 opacity-20 scale-150"
        alt="Logo decoration"
        priority
      />
      <Image
        src={Logo}
        className="absolute -z-50 w-72 -rotate-45 -right-10 top-5 opacity-20 "
        alt="Logo decoration 2"
        priority
      />
      {cookies.Name && session ? (
        <>
          <SuccessAnim />
          <div className="text-xl font-bold">
            Appointment Booked Successfully!
          </div>
          <p className="w-2/6 text-sm text-center font-medium text-secondary-foreground/60">
            Thank you for booking At Pawpal! Your order is confirmed, and we
            can't wait to pamper your furry friend. Have questions or special
            requests? Feel free to reach out in the orders page.
          </p>
          <div className="flex gap-5 items-center font-medium">
            <Link href="/book-appointment" prefetch>
              <Button variant="outline">Schedule Another Appointment</Button>
            </Link>
            <Link href="/appointments" prefetch>
              <Button>Track your appointments</Button>
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Success;
