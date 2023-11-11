import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button } from "./ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { loadStripe } from "@stripe/stripe-js";

function AppointmentDetails({ onStepBack }) {
  const [cookies, setCookie, removeCookie] = useCookies(["appointment"]);
  const [price, setPrice] = useState(0);
  const [services, setServices] = useState([]);

  // get services from db
  const getServices = () => {
    fetch("/api/services", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setServices(data.productPriceData.data);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  const price_id = cookies.PriceID;

  const matchingService = services.find((service) => service.id === price_id);

  const matchingPrice = matchingService ? matchingService.unit_amount : null;

  const quantity = cookies.Duration ? Number(cookies.Duration) : 1;

  const service = cookies.Service;

  const date = new Date(cookies.Date);

  const router = useRouter();
  const handleCancellation = () => {
    removeCookie("appointment", { path: "/" });
    removeCookie("Allergies", { path: "/" });
    removeCookie("Breed", { path: "/" });
    removeCookie("Date", { path: "/" });
    removeCookie("Duration", { path: "/" });
    removeCookie("Name", { path: "/" });
    removeCookie("PriceID", { path: "/" });
    removeCookie("Service", { path: "/" });
    removeCookie("Special", { path: "/" });
    router.push("/");
  };

  // stripe

  let stripePromise;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY);
    }

    return stripePromise;
  };

  const item = {
    price: cookies.PriceID,
    quantity: quantity,
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/book-appointment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/book-appointment/cancel`,
  };

  const redirectToCheckout = async () => {
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };

  return (
    <motion.div
      className="px-16 h-full w-full grid grid-cols-3 gap-10"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      {/** appointment details */}
      <div className="col-span-2 w-full h-full bg-card text-primary-foreground rounded-xl p-6 ">
        <div className="flex flex-row items-center justify-center relative mb-5">
          <button
            className="h-fit w-fit flex items-center gap-1 transition-all hover:scale-105 font-medium absolute left-0"
            onClick={onStepBack}
          >
            <IoIosArrowBack size={20} />
            <div>Back</div>
          </button>
          <div className="text-center font-semibold text-lg">
            Appointment Details
          </div>
        </div>
        <div className="h-full flex flex-col gap-3 py-5">
          <div className="flex gap-10">
            <div>Dog's Name:</div>
            <div className="font-semibold">{cookies.Name}</div>
          </div>
          <div className="flex gap-10">
            <div>Dog's Breed:</div>
            <div className="font-semibold">{cookies.Breed}</div>
          </div>
          {cookies.Allergies === "None" ? (
            <></>
          ) : (
            <div className="flex gap-10">
              <div>Allergies:</div>
              <div className="font-semibold">{cookies.Allergies}</div>
            </div>
          )}
          <div className="flex gap-10">
            <div>Service:</div>
            <div className="font-semibold">{service}</div>
          </div>
          {service === "Boarding" ? (
            <div className="flex gap-10">
              <div>Duration:</div>
              <div className="font-semibold">{quantity}</div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex gap-10">
            <div>Scheduled Date:</div>
            <div className="font-semibold">{date.toDateString()}</div>
          </div>
          <div className="flex gap-10">
            <div>Scheduled Time:</div>
            <div className="font-semibold">
              {date.toLocaleTimeString(window.navigator.language, {
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="flex gap-10">
            <div>Special Requests:</div>
            <div className="font-semibold">{cookies.Special}</div>
          </div>
        </div>
      </div>
      {/** order summary */}
      <div className="bg-card text-primary-foreground rounded-xl flex flex-col justify-between p-6 ">
        <div className="font-semibold text-lg mb-5">Order Summary</div>

        <div className="h-full flex flex-col gap-5 py-5">
          <div className="flex justify-between">
            <div>Service:</div>
            <div className="font-semibold">{service}</div>
          </div>
          <div className="flex justify-between">
            <div>Price (per session):</div>
            <div className="font-semibold">{matchingPrice / 100} $</div>
          </div>
          {service === "Boarding" ? (
            <div className="flex justify-between">
              <div>Duration (days):</div>
              <div className="font-semibold">{quantity}</div>
            </div>
          ) : (
            <></>
          )}
          <div className="self-center w-3/4 h-1 bg-primary-foreground/5 rounded-full" />
          <div className="flex justify-between">
            <div>Total</div>
            <div className="font-semibold gap-1">
              {quantity > 0
                ? (matchingPrice / 100) * quantity
                : matchingPrice / 100}{" "}
              $
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button className="w-full font-semibold" onClick={redirectToCheckout}>
            Proceed to checkout
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Cancel Appointment</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your appointment data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancellation}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
}

export default AppointmentDetails;
