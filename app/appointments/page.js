"use client";
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiScissors } from "react-icons/hi2";
import { FaDog } from "react-icons/fa";
import { GiDogHouse, GiJumpingDog } from "react-icons/gi";
import OrderDetails from "@/components/OrderDetails";
import { useRouter, useSearchParams } from "next/navigation";
import NoData from "@/components/ui/no-data";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Select from "@/components/ui/Select_Animation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Icons = {
  Grooming: HiScissors,
  Daycare: FaDog,
  Boarding: GiDogHouse,
  Training: GiJumpingDog,
};

function Appointment() {
  const { user } = UserAuth();
  const router = useRouter();
  const params = useSearchParams();

  const [selectedAppointment, setSelectedAppointment] = useState(
    params.get("id") || ""
  );
  const [currUser, setCurrUser] = useState("");
  const [appointments, setAppointments] = useState([]);

  // get appointments from db
  const RetrieveAppointments = () => {
    fetch(`/api/get_orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.uid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
        console.log(data);
      });
  };

  useEffect(() => {
    if (user) {
      RetrieveAppointments();
      setCurrUser(user.uid);
    }
  }, [user]);

  const ServiceIcon = ({ serviceType }) => {
    if (serviceType in Icons) {
      const IconComponent = Icons[serviceType];
      return <IconComponent size={30} className="fill-orange-500" />;
    } else {
      return <div>Icon not found</div>;
    }
  };

  useEffect(() => {
    const id = params.get("id");
    setSelectedAppointment(id || "");
  }, [params]);

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const Item = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

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
    <div className="w-full h-full grid grid-cols-12 gap-1">
      {appointments.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full col-span-3"
          >
            <div className="h-full flex flex-col gap-3">
              <div className="w-full h-12 flex items-center text-lg bg-card rounded-xl font-bold p-5 shadow-sm">
                All Appointments
              </div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="show"
                className="h-[calc(100vh-3.75rem)]  relative"
                key={appointments.length}
              >
                <div className="absolute inset-0 overflow-auto disable-scrollbars">
                  <div className="flex flex-col gap-3">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.orderId}
                        variants={Item}
                        className={`w-full h-[4.5rem] flex gap-2 ${
                          selectedAppointment === appointment.orderId
                            ? "bg-muted"
                            : "bg-card"
                        } bg-card hover:bg-muted transition-colors rounded-xl font-semibold p-2 shadow-sm relative cursor-pointer`}
                        onClick={() => {
                          router.push(
                            `/appointments?id=${appointment.orderId}`
                          );
                          setSelectedAppointment(appointment.orderId);
                        }}
                      >
                        <div
                          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all w-4/6 h-1 rounded-t-full ${
                            selectedAppointment === appointment.orderId
                              ? "bg-orange-500"
                              : "bg-card"
                          }`}
                        />
                        <div className="h-full w-16 bg-primary/10 rounded-xl flex justify-center items-center">
                          <ServiceIcon serviceType={appointment.Service} />
                        </div>
                        <div className="w-full flex flex-col justify-between py-1 pr-1">
                          <div className="flex gap-1 items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div className="font-medium">
                                {appointment.Service}
                              </div>
                              <div className="text-sm font-medium text-muted-foreground">
                                - for {appointment.name}
                              </div>
                            </div>
                            <div className="text-orange-500">
                              {appointment.TotalPaid / 100} $
                            </div>
                          </div>
                          <div className="flex gap-1 items-center">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                appointment.Status === "Fulfilled"
                                  ? "bg-green-600"
                                  : "bg-primary"
                              } `}
                            />
                            <div
                              className={`${
                                appointment.Status === "Fulfilled"
                                  ? "text-green-600"
                                  : "text-primary"
                              } font-semibold text-sm uppercase`}
                            >
                              {appointment.Status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          <div className="h-full col-span-9 pb-14">
            {selectedAppointment.length > 0 && currUser.length > 0 ? (
              <OrderDetails orderId={selectedAppointment} userId={currUser} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-xl flex flex-col items-center justify-center text-center"
              >
                <div className="bg-card p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-2">
                  <Select />
                  <div className="font-semibold">No Appointment Selected</div>
                  <p className="w-5/6 text-sm text-muted-foreground">
                    Please select an appointment from the list to view its
                    details
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full col-span-12 flex flex-col items-center justify-center"
        >
          <NoData />
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="text-lg font-bold text-center">
              No Appointments Found
            </div>
            <p className="w-5/6 text-sm text-muted-foreground text-center">
              You haven't placed any appointments yet. Click the button below to
              book a new appointment.
            </p>
            <div className="flex items-center gap-5">
              <Button
                className="font-semibold"
                onClick={() => {
                  router.push("/book-appointment");
                }}
              >
                Book a new appointment
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/");
                }}
              >
                Go To Homepage
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Appointment;
