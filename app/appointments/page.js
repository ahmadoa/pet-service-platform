"use client";
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiScissors } from "react-icons/hi2";
import { FaDog } from "react-icons/fa";
import { GiDogHouse, GiJumpingDog } from "react-icons/gi";
import OrderDetails from "@/components/OrderDetails";

const Icons = {
  Grooming: HiScissors,
  Daycare: FaDog,
  Boarding: GiDogHouse,
  Training: GiJumpingDog,
};

function Appointment() {
  const { user } = UserAuth();

  const [selectedData, setSelectedData] = useState({});
  const [appointments, setAppointments] = useState([]);

  const RetrieveAppointments = () => {
    fetch(`/api/orders?userId=${user.uid}`, {
      method: "GET",
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

  return (
    <div className="w-full h-full grid grid-cols-12 gap-5">
      {appointments ? (
        <>
          <div className="col-span-3">
            <div className="h-full flex flex-col gap-3">
              <div className="w-full h-12 flex items-center text-lg bg-card rounded-xl font-bold p-5 shadow-sm">
                All Appointments
              </div>
              <div className="h-full flex flex-col gap-3 overflow-scroll">
                {appointments.map((appointment) => (
                  <div
                    className={`w-full h-[4.5rem] flex gap-2 ${
                      selectedData.orderId === appointment.orderId
                        ? "bg-muted"
                        : "bg-card"
                    } bg-card hover:bg-muted transition-all rounded-xl font-semibold p-2 shadow-sm relative cursor-pointer`}
                    onClick={() => {
                      setSelectedData(appointment);
                    }}
                  >
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all w-4/6 h-1 rounded-t-full ${
                        selectedData.orderId === appointment.orderId
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
                            appointment.Status === "fulfilled"
                              ? "bg-green-600"
                              : "bg-primary"
                          } `}
                        />
                        <div
                          className={`${
                            appointment.Status === "fulfilled"
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
          </div>
          <div className="col-span-9 bg-card rounded-l-xl">
            <OrderDetails orderData={selectedData} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Appointment;
