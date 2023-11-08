"use client";
import Lottie from "lottie-react";
import SelectAnimation from "@/public/Select.json";

export default function Select() {
  return (
    <Lottie animationData={SelectAnimation} loop={true} className="w-32" />
  );
}
