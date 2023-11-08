"use client";
import Lottie from "lottie-react";
import NoDataAnimation from "@/public/NoDataAnimation.json";

export default function NoData() {
  return (
    <Lottie animationData={NoDataAnimation} loop={true} className="w-96" />
  );
}
