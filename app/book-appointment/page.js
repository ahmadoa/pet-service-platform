"use client";
import DogInfoStep from "@/components/DogInfoStep";
import ServiceStep from "@/components/ServiceStep";
import { useState, useEffect } from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import ScheduleStep from "@/components/ScheduleStep";
import AppointmentDetails from "@/components/AppointmentDetailsStep";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Appointement() {
  const [activeTab, setActiveTab] = useState(0);
  const [services, setServices] = useState([]);
  const router = useRouter();

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

  const handleStepNext = () => {
    setActiveTab((prev) => prev + 1);
  };

  const handlePreviousNext = () => {
    setActiveTab((prev) => prev - 1);
  };

  const formElements = [
    <DogInfoStep onStepNext={handleStepNext} />,
    <ServiceStep
      onStepNext={handleStepNext}
      onStepBack={handlePreviousNext}
      services={services && services}
    />,
    <ScheduleStep
      onStepNext={handleStepNext}
      onStepBack={handlePreviousNext}
    />,
    <AppointmentDetails
      services={services && services}
      onStepBack={handlePreviousNext}
    />,
  ];

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
    <div className="h-under-nav w-full pt-16 pb-10 px-7 relative overflow-hidden">
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
      {formElements[activeTab]}
    </div>
  );
}
