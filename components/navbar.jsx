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
import { BsBellFill } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import moment from "moment";
import profIMG from "@/public/profIMG.png";
import { db } from "@/lib/firebase";

export default function Navbar() {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  // listening to notifications
  useEffect(() => {
    if (user != null) {
      const q = query(
        collection(db, "users", user.uid, "Notifications"),
        orderBy("createdAt")
      );
      onSnapshot(q, (querySnapshot) => {
        const notificationDocs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          notificationDocs.push(data);
        });
        setNotifications(notificationDocs);
      });
    }
  }, [user]);

  const handleNotifSeen = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "Notifications", id));
  };

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
        {loading ? null : !user ? (
          <>
            <Link
              className={`${
                pathname === "/" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/"}
            >
              Home
            </Link>
            <Link
              className={`${
                pathname === "/#About" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/#About"}
            >
              About
            </Link>
            <Link
              className={`${
                pathname === "/#Services" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/#Services"}
            >
              Services
            </Link>
            <Link
              className={` ${
                pathname === "/#Team" ? "font-bold " : ""
              } transition-all hover:scale-105`}
              href={"/#Team"}
            >
              Team
            </Link>
          </>
        ) : (
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
            >
              Home
            </Link>
            <Link
              className={`${
                pathname === "/book-appointment" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/book-appointment"}
            >
              Book Appointment
            </Link>
            <Link
              className={`${
                pathname === "/appointments" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/appointments"}
            >
              Appointments
            </Link>
            <Link
              className={`${
                pathname === "/archives" ? "font-bold " : ""
              }  transition-all hover:scale-105`}
              href={"/archives"}
            >
              Archives
            </Link>
          </motion.div>
        )}
        <Link
          className={`${
            pathname === "/#Contact" ? "font-bold " : ""
          }  transition-all hover:scale-105`}
          href={"/#Contact"}
        >
          Contact Us
        </Link>
      </div>

      {loading ? null : user ? (
        <div className="flex gap-5 items-center">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
              <button className="p-2 text-sm font-medium text-secondary-foreground outline-1 outline outline-secondary-foreground rounded-xl flex gap-1 relative transition-all hover:bg-secondary">
                <div className="absolute w-5 h-5 -top-3 -right-2 flex items-center justify-center text-sm font-semibold text-primary-foreground p-2 bg-primary rounded-full">
                  {notifications.length}
                </div>
                <BsBellFill size={19} className="fill-secondary-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="max-h-80 flex flex-col gap-3 p-3 overflow-y-scroll items-center justify-center"
              align="start"
            >
              {notifications.length > 0 ? (
                <>
                  <div className="text-lg font-semibold">Notifications</div>
                  <div className="flex flex-col gap-3">
                    {notifications.map((notif) => (
                      <Link
                        href={notif.href}
                        onClick={() => {
                          setPopoverOpen(false);
                          handleNotifSeen(notif.id);
                        }}
                        className="w-full p-2 flex gap-2 transition-all hover:bg-secondary-foreground/10 rounded-xl overflow-hidden whitespace-nowrap text-ellipsis"
                        key={notif.id}
                      >
                        {notif.type === "fulfilled" ? (
                          <>
                            <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden">
                              <Image
                                src={profIMG}
                                className="h-full w-full object-cover"
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt="profile picture"
                              />
                            </div>
                            <div className=" flex flex-col justify-between text-sm">
                              <div className="w-48 text-secondary-foreground font-semibold overflow-hidden text-ellipsis">
                                You order has been fulfilled, you can pick your
                                dog now
                              </div>
                              <div className="text-xs text-muted-foreground font-medium">
                                {moment(notif.createdAt.toDate()).calendar()}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden">
                              <Image
                                src={profIMG}
                                className="h-full w-full object-cover"
                                width={0}
                                height={0}
                                sizes="100vw"
                                alt="profile picture"
                              />
                            </div>
                            <div className=" flex flex-col gap-2 text-sm">
                              <div className="w-full text-secondary-foreground font-semibold text-ellipsis">
                                Pawpal service sent a message
                              </div>
                              <div className="w-48 px-2 py-1 outline outline-1 outline-muted-foreground rounded-lg overflow-hidden text-ellipsis">
                                {notif.text}
                              </div>
                              <div className="text-xs text-muted-foreground font-medium">
                                {moment(notif.createdAt.toDate()).calendar()}
                              </div>
                            </div>
                          </>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground text-sm capitalize">
                  no notifications found!
                </div>
              )}
            </PopoverContent>
          </Popover>
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
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
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
