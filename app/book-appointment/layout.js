"use client";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

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
  return <div>{children}</div>;
}
