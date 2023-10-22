"use client";
import DogInfoStep from "@/components/DogInfoStep";
import ServiceStep from "@/components/ServiceStep";
import { useState } from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import ScheduleStep from "@/components/ScheduleStep";

export default function Appointement() {
  return (
    <div className="h-under-nav w-full pt-24 pb-10 px-7 relative overflow-hidden">
      <Image
        src={Logo}
        className="absolute -z-50 w-96 rotate-45 left-5 bottom-5 opacity-20 scale-150"
      />
      <Image
        src={Logo}
        className="absolute -z-50 w-72 -rotate-45 -right-10 top-5 opacity-20 "
      />
      {/*
        <DogInfoStep />
        <ScheduleStep />
      */}
      <ServiceStep />
    </div>
  );
}
