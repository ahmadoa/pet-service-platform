import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import ChatComponent from "./ChatComponent";
import { motion } from "framer-motion";
import Select from "./ui/Select_Animation";
import Stripe from "stripe";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
} from "./ui/alert-dialog";

export default function OrderDetails({ orderId, userId }) {
  const [appointment, setAppointment] = useState({});
  const [disableCancel, setDisableCancel] = useState(false);
  const quantity = appointment.Duration ? Number(appointment.Duration) : 1;
  const date = new Date(appointment.Date);
  const { toast } = useToast();
  const [defTab, setDefTab] = useState("details");

  /*const RetrieveAppointment = () => {
    fetch(`/api/order?userId=${userId}&orderId=${orderId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointment(data);
      })
      .then(() => {
        console.log(appointment.Status);
      });
  };*/

  useEffect(() => {
    if (orderId) {
      RetrieveAppointment();
    }
  }, [orderId]);

  const currentDate = new Date();

  useEffect(() => {
    if (Object.keys(appointment).length > 0) {
      const appointmentDate = new Date(appointment.Date);
      const timeDifference = appointmentDate - currentDate;
      const hoursDifference = timeDifference / (1000 * 60 * 60);
      const isButtonDisabled = hoursDifference < 24;
      setDisableCancel(isButtonDisabled);
    }
  }, [appointment]);

  /*const handleArchive = async () => {
    const response = await fetch("/api/archives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: appointment.orderId,
        userId: appointment.userId,
      }),
    });
    if (response.ok) {
      console.log("archived successfully!");
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Archived Appointment Successfully!",
        description: "You've archived an appointment successfully",
      });
    } else {
      console.log("failed to archive!");
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Failed To Archived Appointment!",
        description: "Appointment archive failed",
      });
    }
  };*/

  useEffect(() => {
    setDefTab("details");
  }, [appointment]);

  const cancelAppointment = async () => {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

    const refund = await stripe.refunds.create({
      payment_intent: orderId,
    });

    if (refund.status === "succeeded") {
      console.log("Refund succeeded!");
      await deleteDoc(doc(db, "users", userId, "Orders", orderId));
      await deleteDoc(doc(db, "Orders", orderId));
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Appointment Canceled Successfully!",
        description: "You've Canceled & refunded an appointment successfully",
      });
    } else {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Failed To Cancel Appointment!",
        description: "Appointment cancelation failed",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full h-full px-5"
    >
      {Object.keys(appointment).length > 0 && appointment ? (
        <Tabs
          defaultValue={defTab}
          value={defTab}
          onValueChange={(value) => setDefTab(value)}
          className="h-full w-full"
        >
          <div className="h-12 bg-card rounded-xl w-fit p-1 shadow-sm">
            <TabsList className="h-full w-fit flex gap-3 px-1 bg-transparent">
              <TabsTrigger value="details" className="h-full w-fit">
                Appointment details
              </TabsTrigger>
              <TabsTrigger value="messages" className="h-full w-fit">
                Messages
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="details"
            className="h-full bg-card rounded-xl overflow-y-scroll"
          >
            <div className="h-full grid grid-cols-2">
              {/** details section */}
              <div className="h-full flex flex-col gap-3 p-5">
                <div className="flex gap-5  ">
                  <div>Dog's Name:</div>
                  <div className="font-semibold">{appointment.name}</div>
                </div>
                <div className="flex gap-5">
                  <div>Dog's Breed:</div>
                  <div className="font-semibold">{appointment.breed}</div>
                </div>
                {appointment.Allergies === "None" ? (
                  <></>
                ) : (
                  <div className="flex gap-5">
                    <div>Allergies:</div>
                    <div className="font-semibold">{appointment.Allergies}</div>
                  </div>
                )}
                <div className="flex gap-5">
                  <div>Service:</div>
                  <div className="font-semibold">{appointment.Service}</div>
                </div>
                {appointment.Service === "Boarding" ? (
                  <div className="flex gap-5">
                    <div>Duration:</div>
                    <div className="font-semibold">{quantity}</div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="flex gap-5">
                  <div>Scheduled Date:</div>
                  <div className="font-semibold">{date.toDateString()}</div>
                </div>
                <div className="flex gap-5">
                  <div>Scheduled Time:</div>
                  <div className="font-semibold">
                    {date.toLocaleTimeString(window.navigator.language, {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>Special Requests:</div>
                  <div className="font-semibold">
                    {appointment.SpecialRequest}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>Payment Status:</div>
                  <div className="font-semibold">
                    {appointment.PaymentStatus}
                  </div>
                </div>
                <div className="flex gap-5">
                  <div>Total Paid:</div>
                  <div className="font-semibold">
                    {appointment.TotalPaid / 100} $
                  </div>
                </div>
              </div>
              {/** buttons section */}
              <div className="h-full w-full flex flex-col justify-between p-5 items-end">
                <div>
                  <div
                    className={`${
                      appointment.Status === "On Process"
                        ? "bg-primary"
                        : "bg-green-600"
                    } font-semibold text-white py-2 px-3 w-fit rounded-xl `}
                  >
                    {appointment.Status}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    disabled={
                      appointment.Status === "On Process" ? true : false
                    }
                    onClick={handleArchive}
                  >
                    Archive appointment
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button disabled={disableCancel} className="">
                        Cancel Appointment
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Appointment Cancelation & refund
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          If you are sure of cancelling and receiving a refund
                          of this appintment, please proceed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={cancelAppointment}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="messages" className="h-full bg-card rounded-xl">
            <ChatComponent
              userId={appointment.userId}
              orderId={appointment.orderId}
              AppointDate={appointment.Date}
              status={appointment.Status}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <></>
      )}
    </motion.div>
  );
}
