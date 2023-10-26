"use client";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuth();
  }, [user]);

  return (
    <motion.div
      className="h-11 flex mx-7 mt-3 justify-between items-center"
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
    >
      <div className="flex gap-5 items-center">
        <Link href={"/"} prefetch>
          <Image src={Logo} className="rotate-[30deg] w-8" alt="navbar logo" />
        </Link>
        {loading ? null : !user ? null : (
          <motion.div
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            className="flex gap-5"
          >
            <Link
              className={`${
                pathname === "/" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/"}
              prefetch
            >
              Home
            </Link>
            <Link
              className={`${
                pathname === "/orders" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/appointments"}
              prefetch
            >
              Appointments
            </Link>
            <Link
              className={`${
                pathname === "/contact" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/contact"}
              prefetch
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </div>

      {loading ? null : user ? (
        <motion.div
          animate={{
            opacity: 1,
          }}
          initial={{
            opacity: 0,
          }}
        >
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.photoURL} />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            opacity: 1,
          }}
          initial={{
            opacity: 0,
          }}
        >
          <Button
            className="font-semibold capitalize flex gap-2"
            onClick={handleSignIn}
          >
            <FcGoogle size={28} />
            sign in with google
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
