"use client";
import Lottie from "lottie-react";
import successAnimation from "@/public/successAnimation.json";

export default function Success() {
  return (
    <Lottie
      animationData={successAnimation}
      loop={true}
      className="w-48 stroke-primary fill-primary"
    />
  );
}