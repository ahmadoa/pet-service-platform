"use client";
import heroIMG from "@/public/homepage/heroIMG.png";
import boarding from "@/public/homepage/boarding.png";
import daycare from "@/public/homepage/daycare.png";
import grooming from "@/public/homepage/grooming.png";
import training from "@/public/homepage/training.png";
import foot_1 from "@/public/homepage/foot_1.jpg";
import foot_2 from "@/public/homepage/foot_2.jpg";
import foot_3 from "@/public/homepage/foot_3.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Scroll from "@/components/ui/scroll";
import { EmblaCarousel } from "@/components/TeamCarousel";
import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

// temporary data
/*
const Services = [
  {
    name: "Grooming",
    image: grooming,
    description:
      "Indulge your pet with spa-like pampering and grooming for a happy, healthy look.",
  },
  {
    name: "Training",
    image: training,
    description:
      "Transform your dog into a well-behaved companion with personalized training.",
  },
  {
    name: "Boarding",
    image: boarding,
    description:
      "Provide your pet a cozy home away from home when you're away.",
  },
  {
    name: "Daycare",
    image: daycare,
    description:
      "Enrich your dog's life with socialization and exercise in a safe environment.",
  },
];*/

const Team = [
  {
    name: "Ariola Granola",
    profession: "Pet sitter",
    image: boarding,
  },
  {
    name: "Kehlani Bey",
    profession: "Dog groomer",
    image: training,
  },
  {
    name: "Ammar Wiy",
    profession: "Pet sitter",
    image: foot_1,
  },
  {
    name: "Mary Ketle",
    profession: "Canine Coach",
    image: daycare,
  },
  {
    name: "Jake Peralta",
    profession: "Daycare attendant",
    image: grooming,
  },
  {
    name: "Jake Peralta",
    profession: "Dog Groomer",
    image: foot_2,
  },
];

export default function Home() {
  const [services, setServices] = useState([]);

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

  return (
    <div className="flex flex-col gap-5">
      {/* hero section */}
      <div className={`h-[calc(100vh-4rem)] grid grid-cols-3 mx-7 gap-6 pt-3`}>
        {/* grid col 1*/}
        <div className="flex flex-col justify-between mt-20">
          <div className="flex flex-col gap-5">
            <div className="font-bold text-4xl leading-snug capitalize">
              Your Trusted Companion Deserves The Best Care
            </div>
            <div className="text-sm text-secondary-foreground capitalize">
              Welcome to Pawpal - Where Tails Wag and Hearts Are Happy!
            </div>
            <Button className="w-fit font-semibold">
              Book An Appointement
            </Button>
          </div>
        </div>
        {/* grid col 2*/}
        <div className="h-full bg-primary/30 rounded-t-full rounded-b-[1000px] flex items-end justify-center relative">
          <div className="absolute">
            <Scroll />
          </div>
          <Image src={heroIMG} className="w-4/5" alt="Hero Image" />
        </div>
        {/* grid col 3*/}
        <div className="place-self-end flex flex-col pb-10 gap-4">
          <div className="self-end bg-primary/30 flex w-fit items-center gap-3 py-2 px-3 rounded-xl mb-10">
            <div className="flex flex-col text-right">
              <div>Support</div>
              <div className="uppercase font-bold">ALL</div>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-col">
              <div>dog</div>
              <div>breeds</div>
            </div>
          </div>
          <div className="uppercase text-sm font-semibold relative">
            <div className="absolute right-0 -bottom-1 w-3/5 h-1 bg-primary rounded-full"></div>
            what do we offer for your doggie
          </div>
          <div className="flex self-end gap-2 items-center">
            {/* boarding */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={boarding}
                    className="w-12 rounded-full"
                    alt="Boarding"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Boarding</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* daycare */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={daycare}
                    className="w-12 rounded-full"
                    alt="Daycare"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Daycare</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* training */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={training}
                    className="w-12 rounded-full"
                    alt="Training"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Training</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* grooming */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src={grooming}
                    className="w-12 rounded-full"
                    alt="Grooming"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Grooming</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="w-full h-[3px] bg-secondary-foreground opacity-[2%] my-5" />
      {/* services section */}
      <div className="flex flex-col gap-7 mx-7">
        {/* header */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <div className="text-xl font-bold">Our Services</div>
            <div className="h-1 w-32 bg-primary rounded-full" />
          </div>
          <div className="w-4/12 text-sm text-secondary-foreground">
            Explore tailored pet care services we provide, from grooming to
            training, we've got your pets covered.
          </div>
        </div>
        {/* services elements */}
        {services.length === 0 ? (
          <div className="h-[25rem] w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 h-[25rem]">
            {services.map((serve, index) => (
              <div
                key={serve.id}
                className={`h-[90%] flex flex-col justify-between bg-card rounded-xl py-7 shadow-xl transition-all hover:scale-[103%] ${
                  index % 2 === 0 ? `self-start` : "self-end"
                }`}
              >
                <div className="flex flex-col gap-3 px-3">
                  <div className="font-semibold text-lg text-primary">
                    / {serve.product.name}
                  </div>
                  <div className="pl-4 text-secondary-foreground leading-snug">
                    {serve.product.description}
                  </div>
                </div>
                <div className="w-9/12 h-24 rounded-e-xl overflow-hidden relative">
                  <Image
                    src={serve.product.images[0]}
                    objectFit="cover"
                    layout="fill"
                    sizes=""
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* team section */}
      <div className="h-[calc(100vh-7rem)] bg-primary/20 mt-5 flex flex-col gap-5 py-5 pl-7">
        <div className="flex gap-2 items-center">
          <div className="text-xl font-bold capitalize">
            meet our passionate team
          </div>
          <div className="h-1 w-32 bg-primary rounded-full" />
        </div>
        {/* team members */}
        <div className="h-full w-full flex">
          <EmblaCarousel Team={Team} />
        </div>
      </div>
      {/* footer section */}
      <div className="h-[28rem] grid grid-cols-4 gap-3 my-5 mx-16">
        <div className="h-5/6 w-full bg-white rounded-2xl overflow-hidden self-end shadow-lg">
          <Image
            src={foot_1}
            className="object-cover w-full h-full"
            alt="footer dog picture 1"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-between items-start text-center">
          <div className="w-5/6 flex flex-col items-center self-center gap-7 mt-5">
            <div className="text-3xl font-semibold">
              We offer puppy daycare and specialized pet services to meet all
              your needs
            </div>
            <Button className="font-semibold w-fit">
              Contact us for further information
            </Button>
          </div>
          <Image src={foot_3} className="w-5/6 self-center" />
        </div>
        <div className="h-5/6 w-full bg-white rounded-2xl overflow-hidden self-end shadow-lg">
          <Image
            src={foot_2}
            className="object-cover w-full h-full"
            alt="footer dog picture 2"
          />
        </div>
      </div>
    </div>
  );
}
