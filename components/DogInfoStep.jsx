"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

const DogInfo = (props) => {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [breed, setBreed] = useState(searchParams.get("breed") || "");
  const [allergies, setAllergies] = useState(
    searchParams.get("allergies") || ""
  );

  const [errors, setErrors] = useState({});

  const router = useRouter();

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
      router.push(`?name=${name}&breed=${breed}&allergies=${allergies}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-secondary-foreground/50 text-sm font-medium">
        Step 1 of 4
      </div>
      <div className="text-3xl font-bold">Tell Us About Your Dog</div>
      <form
        className="h-full w-full flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          validatePushAndMove();
        }}
      >
        <div className="grid grid-cols-3 gap-10 mt-8">
          {/** dog name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-secondary-foreground text-sm font-semibold mb-2"
            >
              Dog's name
            </label>
            <input
              className={` pl-2 h-10 rounded-lg outline outline-1 outline-secondary-foreground focus:outline-2 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
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
              className={` pl-2 h-10 rounded-lg outline outline-1 outline-secondary-foreground focus:outline-2 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
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
              className={`pt-2 pl-2 rounded-lg outline outline-1 outline-secondary-foreground focus:outline-2 h-16 max-h-36 focus:outline-primary focus:shadow-lg focus:shadow-primary/10 transition-all ${
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
    </div>
  );
};

export default DogInfo;