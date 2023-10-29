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

const Icons = {
  Grooming: HiScissors,
  Daycare: FaDog,
  Boarding: GiDogHouse,
  Training: GiJumpingDog,
};

export default function Archives() {
  const [archives, setArchives] = useState([]);

  const params = useSearchParams();

  const [selectedArchive, setSelectedArchive] = useState(
    params.get("id") || ""
  );
  const [currUser, setCurrUser] = useState("");

  const router = useRouter();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        setUser(user);
      } else {
        router.push("/login");
      }
    });
  };

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
    checkUserStatus();
    if (loading === false) {
      RetrieveArchives();
    }
  }, [loading]);

  const ServiceIcon = ({ serviceType }) => {
    if (serviceType in Icons) {
      const IconComponent = Icons[serviceType];
      return <IconComponent size={30} className="fill-orange-500" />;
    } else {
      return <div>Icon not found</div>;
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-12 gap-1">
      {archives ? (
        <>
          <div className="h-full col-span-3">
            <div className="h-full flex flex-col gap-3">
              <div className="w-full h-12 flex items-center text-secondary-foreground text-lg bg-card rounded-xl font-bold p-5 shadow-sm">
                All Archived Appointments
              </div>
              <div className="h-full flex flex-col gap-3 overflow-scroll">
                {archives.map((archive) => (
                  <div
                    key={archive.orderId}
                    className={`w-full h-[4.5rem] flex gap-2 ${
                      selectedArchive === archive.orderId
                        ? "bg-muted"
                        : "bg-card"
                    } bg-card hover:bg-muted transition-all rounded-xl font-semibold p-2 shadow-sm relative cursor-pointer`}
                    onClick={() => {
                      router.push(`/archives?id=${archive.orderId}`, {
                        shallow: true,
                      });
                      setSelectedArchive(archive.orderId);
                      setCurrUser(archive.userId);
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
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="h-full col-span-9 pb-14">
            {selectedArchive.length > 0 && currUser.length > 0 ? (
              <ArchiveDetails orderId={selectedArchive} userId={currUser} />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
