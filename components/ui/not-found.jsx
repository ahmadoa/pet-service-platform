"use client";
import Lottie from "lottie-react";
import notfoundanimation from "@/public/404_animation.json";

export default function Not_found_404() {
  return (
    <Lottie animationData={notfoundanimation} loop={true} className="h-64" />
  );
}
