"use client";
import Lottie from "lottie-react";
import loadingAnimation from "@/public/loading_animation.json";

export default function Scroll() {
  return (
    <Lottie animationData={loadingAnimation} loop={true} className="w-60" />
  );
}
