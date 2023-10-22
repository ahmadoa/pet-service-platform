"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { HiScissors } from "react-icons/hi2";
import { FaDog } from "react-icons/fa";
import { GiDogHouse, GiJumpingDog } from "react-icons/gi";
import { motion } from "framer-motion";

const Icons = {
  Grooming: HiScissors,
  Daycare: FaDog,
  Boarding: GiDogHouse,
  Training: GiJumpingDog,
};

const ServiceStep = (props) => {
  const searchParams = useSearchParams();
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(
    searchParams.get("service") || "Grooming"
  );
  const [priceId, setPriceId] = useState("");
  const router = useRouter();

  const getServices = () => {
    fetch("/api/services", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setServices(data.productPriceData.data);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  function onChangeValue(event) {
    setSelectedService(event.target.value);
  }

  const ServiceIcon = ({ serviceType }) => {
    if (serviceType in Icons) {
      const IconComponent = Icons[serviceType];
      return <IconComponent size={36} className="fill-orange-500" />;
    } else {
      return <div>Icon not found</div>;
    }
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const Item = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  const PushAndMove = () => {
    services.map((serve) => {
      if (serve.product.name === selectedService) {
        setPriceId(serve.id);
      }
    });
    if (selectedService && priceId) {
      router.push(`&service=${selectedService}&price_id=${priceId}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-secondary-foreground/50 text-sm font-medium">
        Step 2 of 4
      </div>
      <div className="text-3xl font-bold">Select a service for your dog</div>
      <form
        className="h-full w-full flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          PushAndMove();
        }}
      >
        <motion.div
          key={services.length}
          className="h-full grid grid-cols-4 gap-10 mt-8 mb-4 mx-16"
          onChange={onChangeValue}
          variants={variants}
          initial="hidden"
          animate="show"
        >
          {services.map((serve) => (
            <motion.div variants={Item} key={serve.id}>
              <input
                type="radio"
                id={serve.product.name}
                name="services"
                value={serve.product.name}
                checked={selectedService === serve.product.name}
                className="hidden peer"
              />
              <label
                htmlFor={serve.product.name}
                className="h-full bg-card shadow-lg flex flex-col items-center justify-center gap-2 rounded-2xl transition-all peer-checked:shadow-orange-600/20 peer-checked:outline peer-checked:outline-2 peer-checked:outline-orange-500 relative"
              >
                <div className="absolute left-3 top-3 text-lg text-orange-500 font-semibold">
                  {serve.unit_amount / 100}$
                </div>
                <ServiceIcon serviceType={serve.product.name} />
                <div className="font-semibold text-orange-500">
                  {serve.product.name}
                </div>
              </label>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-5 w-full flex items-end justify-between">
          <button type="button" className="font-semibold">
            Back
          </button>
          <Button className="self-end font-semibold">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceStep;