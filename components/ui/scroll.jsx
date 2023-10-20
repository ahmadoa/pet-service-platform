"use client";
import Lottie from "lottie-react";
import scrollAnimation from "@/public/scroll_animation.json";

export default function Scroll() {
  return (
    <Lottie animationData={scrollAnimation} loop={true} className="w-14" />
  );
}
