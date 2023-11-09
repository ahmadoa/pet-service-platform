import { useState } from "react";
import { Button } from "./ui/button";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";

const DogInfo = ({ onStepNext }) => {
  const [cookies, setCookie] = useCookies(["appointment"]);
  const [name, setName] = useState(cookies.Name || "");
  const [breed, setBreed] = useState(cookies.Breed || "");
  const [allergies, setAllergies] = useState(cookies.Allergies || "");

  const [errors, setErrors] = useState({});

  // validating form inputs and moving to next step
  const validatePushAndMove = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Dog's name is required";
    }

    if (!breed.trim()) {
      newErrors.breed = "Dog's breed is required";
    }

    if (!allergies.trim()) {
      newErrors.allergies = "Allergies is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCookie("Name", name, { path: "/", sameSite: "lax" });
      setCookie("Breed", breed, { path: "/", sameSite: "lax" });
      setCookie("Allergies", allergies, {
        path: "/",
        sameSite: "lax",
      });
      onStepNext();
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
      }}
    >
      <div className="text-secondary-foreground/50 text-sm font-medium">
        Step 1 of 3
      </div>
      <div className="text-3xl font-bold">Tell Us About Your Dog</div>
      <form
        className="h-full w-full flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          validatePushAndMove();
        }}
      >
        <div className="grid grid-cols-2 gap-10 mt-8 mx-10">
          {/** dog name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-secondary-foreground text-sm font-semibold mb-2"
            >
              Dog's name
            </label>
            <input
              className={` pl-2 h-10 rounded-lg outline outline-2 outline-secondary-foreground/50 focus:outline-2 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
                name.length > 0 ? "focus:outline-green-500" : ""
              }`}
              name="name"
              placeholder="Your dog's name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          {/** dog breed */}
          <div className="flex flex-col">
            <label
              htmlFor="breed"
              className="text-secondary-foreground text-sm font-semibold mb-2"
            >
              Dog's breed
            </label>
            <input
              className={` pl-2 h-10 rounded-lg outline outline-2 outline-secondary-foreground/50 focus:outline-2 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
                breed.length > 0 ? "focus:outline-green-500" : ""
              }`}
              name="name"
              placeholder="Your dog's breed..."
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
            {errors.breed && (
              <p className="text-red-500 text-xs mt-1">{errors.breed}</p>
            )}
          </div>
          {/** dog allergies */}
          <div className="flex flex-col">
            <label
              htmlFor="breed"
              className="text-secondary-foreground text-sm font-semibold mb-2"
            >
              Allergies
            </label>
            <textarea
              className={`pt-2 pl-2 rounded-lg outline outline-2 outline-secondary-foreground/50 focus:outline-2 h-16 max-h-36 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
                allergies.length > 0 ? "focus:outline-green-500" : ""
              }`}
              name="name"
              placeholder="Enter any allergies your dog may have (if none, write None)"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
            {errors.allergies && (
              <p className="text-red-500 text-xs mt-1">{errors.allergies}</p>
            )}
          </div>
        </div>
        <div className="h-full w-full flex items-end justify-end">
          <Button className="self-end font-semibold">Next</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default DogInfo;
