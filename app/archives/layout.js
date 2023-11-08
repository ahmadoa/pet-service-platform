"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";
import Logo from "@/public/logo.svg";
import Image from "next/image";

export default function layout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // check user
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="h-under-nav w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full h-under-nav pl-7 py-5 relative overflow-hidden">
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
      {children}
    </div>
  );
}
