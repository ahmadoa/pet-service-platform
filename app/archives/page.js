"use client";
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiScissors } from "react-icons/hi2";
import { FaDog } from "react-icons/fa";
import { GiDogHouse, GiJumpingDog } from "react-icons/gi";
import ArchiveDetails from "@/components/ArchiveDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Select from "@/components/ui/Select_Animation";
import { motion } from "framer-motion";
import NoData from "@/components/ui/no-data";
import { Button } from "@/components/ui/button";

const Icons = {
  Grooming: HiScissors,
  Daycare: FaDog,
  Boarding: GiDogHouse,
  Training: GiJumpingDog,
};

export default function Archives() {
  const [archives, setArchives] = useState([]);
  const { user } = UserAuth();
  const params = useSearchParams();

  const [selectedArchive, setSelectedArchive] = useState(
    params.get("id") || ""
  );
  const [currUser, setCurrUser] = useState("");

  const router = useRouter();

  // get archives from db
  const RetrieveArchives = () => {
    fetch(`/api/archives?userId=${user.uid}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setArchives(data);
        console.log(data);
      });
  };

  useEffect(() => {
    if (user) {
      RetrieveArchives();
      setCurrUser(user.uid);
    }
  }, [user]);

  const ServiceIcon = ({ serviceType }) => {
    if (serviceType in Icons) {
      const IconComponent = Icons[serviceType];
      return <IconComponent size={30} className="fill-orange-500" />;
    } else {
      return <div>Icon not found</div>;
    }
  };

  useEffect(() => {
    const id = params.get("id");
    setSelectedArchive(id || "");
  }, [params]);

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const Item = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  // check user
  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-12 gap-1">
      {archives.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full col-span-3"
          >
            <div className="h-full flex flex-col gap-3">
              <div className="w-full h-12 flex items-center text-secondary-foreground text-lg bg-card rounded-xl font-bold p-5 shadow-sm">
                All Archived Appointments
              </div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="show"
                key={archives.length}
                className="h-full flex flex-col gap-3 overflow-scroll disable-scrollbars"
              >
                {archives.map((archive) => (
                  <motion.div
                    key={archive.orderId}
                    variants={Item}
                    className={`w-full h-[4.5rem] flex gap-2 ${
                      selectedArchive === archive.orderId
                        ? "bg-muted"
                        : "bg-card"
                    } bg-card hover:bg-muted transition-colors rounded-xl font-semibold p-2 shadow-sm relative cursor-pointer`}
                    onClick={() => {
                      router.push(`/archives?id=${archive.orderId}`, {
                        shallow: true,
                      });
                      setSelectedArchive(archive.orderId);
                    }}
                  >
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all w-4/6 h-1 rounded-t-full ${
                        selectedArchive === archive.orderId
                          ? "bg-orange-500"
                          : "bg-card"
                      }`}
                    />
                    <div className="h-full w-16 bg-primary/10 rounded-xl flex justify-center items-center">
                      <ServiceIcon serviceType={archive.Service} />
                    </div>
                    <div className="w-full flex flex-col justify-between py-1 pr-1">
                      <div className="flex gap-1 items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="font-medium">{archive.Service}</div>
                          <div className="text-sm font-medium text-muted-foreground">
                            - for {archive.name}
                          </div>
                        </div>
                        <div className="text-orange-500">
                          {archive.TotalPaid / 100} $
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            archive.Status === "Fulfilled"
                              ? "bg-green-600"
                              : "bg-primary"
                          } `}
                        />
                        <div
                          className={`${
                            archive.Status === "Fulfilled"
                              ? "text-green-600"
                              : "text-primary"
                          } font-semibold text-sm uppercase`}
                        >
                          {archive.Status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          <div className="h-full col-span-9 pb-14">
            {selectedArchive.length > 0 && currUser.length > 0 ? (
              <ArchiveDetails orderId={selectedArchive} userId={user.uid} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full rounded-xl flex flex-col items-center justify-center text-center"
              >
                <div className="bg-card p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center gap-2">
                  <Select />
                  <div className="font-semibold">No Appointment Selected</div>
                  <p className="w-5/6 text-sm text-muted-foreground">
                    Please select an archived appointment from the list to view
                    its details
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full col-span-12 flex flex-col items-center justify-center"
        >
          <NoData />
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="text-lg font-bold text-center">
              No Archives Found
            </div>
            <p className="w-5/6 text-sm text-muted-foreground text-center">
              You haven't archived any appointments yet. Click the button below
              to track your appointments.
            </p>
            <div className="flex items-center gap-5">
              <Button
                className="font-semibold"
                onClick={() => {
                  router.push("/appointments");
                }}
              >
                Track your appointments
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  router.push("/book-appointment");
                }}
              >
                Book a new appointment
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
