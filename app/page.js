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
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  BiPhoneCall,
  BiLogoLinkedin,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoGmail,
  BiSolidMap,
} from "react-icons/bi";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function Home() {
  const [services, setServices] = useState([]);
  const { user, googleSignIn } = UserAuth();
  const [team, setTeam] = useState([]);
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

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

  const getTeam = () => {
    fetch("/api/team", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTeam(data);
      });
  };

  useEffect(() => {
    getServices();
    getTeam();
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    const params = {
      name: data.firstname,
      email: data.email,
      message: data.message,
      firstname: data.firstname,
      lastname: data.lastname,
    };
    fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify(params),
    }).then((res) => {
      if (res.ok) {
        reset();
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          title: "Email Sent Successfully!",
          description: "Thank you for contacting us, we will get back to you.",
        });
      }
    });
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

  return (
    <div className="flex flex-col gap-5">
      {/* hero section */}
      <motion.div
        className={`h-[calc(100vh-4rem)] grid grid-cols-3 mx-7 gap-6 pt-3`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        {/* grid col 1*/}
        <div className="flex flex-col justify-between mt-20">
          <div className="flex flex-col gap-5">
            <div className="font-bold text-4xl leading-snug capitalize">
              Your Trusted Companion Deserves The Best Care
            </div>
            <div className="text-sm text-secondary-foreground capitalize">
              Welcome to Pawpal - Where Tails Wag and Hearts Are Happy!
            </div>
            {!user ? (
              <Button
                className="w-fit font-semibold capitalize"
                onClick={handleSignIn}
              >
                Embark on a new journey
              </Button>
            ) : (
              <Link href="/book-appointment" prefetch>
                <Button className="w-fit font-semibold capitalize">
                  Book An Appointement
                </Button>
              </Link>
            )}
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
      </motion.div>
      <div className="w-full h-[3px] bg-secondary-foreground opacity-[2%] my-5" />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        id="About"
        className="mx-7"
      >
        <div className="w-full bg-about bg-no-repeat bg-cover rounded-xl p-16 grid grid-cols-2 gap-32">
          <div className="grid grid-rows-2 gap-5 font-medium">
            <div>
              Welcome to our dog-loving community! We're on a mission to provide
              top-notch care & services for your furry friends, ensuring a
              tail-wagging experience with personalized attention to their
              well-being.
            </div>
            <div>
              Whether it's daycare, training, boarding, or grooming, we've got
              your pup covered. Join us in creating a joyful haven where dogs
              thrive, tails wag, and pet parents find peace of mind.
            </div>
          </div>
          <div className="w-5/6 text-3xl font-bold leading-normal">
            Our mission goes beyond providing pet services, it's about creating
            joyful memories.
          </div>
        </div>
      </motion.section>

      {/* services section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        id="Services"
        className="flex flex-col gap-7 mx-7"
      >
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
          <motion.div
            variants={variants}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-4 gap-4 h-[25rem]"
          >
            {services.map((serve, index) => (
              <motion.div
                key={serve.id}
                className={`h-[90%] flex flex-col justify-between bg-card rounded-xl py-7 shadow-sm will-change-transform ${
                  index % 2 === 0 ? `self-start` : "self-end"
                }`}
                variants={Item}
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
                    fill
                    sizes=""
                    className="object-cover"
                    alt="service image"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>
      {/* team section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        id="Team"
        className="h-[calc(100vh-7rem)] bg-primary/20 mt-5 flex flex-col gap-5 py-5 pl-7"
      >
        <div className="flex gap-2 items-center">
          <div className="text-xl font-bold capitalize">
            meet our passionate team
          </div>
          <div className="h-1 w-32 bg-primary rounded-full" />
        </div>
        {/* team members */}
        <div className="h-full w-full flex">
          {team.length === 0 ? (
            <div className="h-[25rem] w-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <EmblaCarousel Team={team} />
          )}
        </div>
      </motion.section>
      {/* footer section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        className="h-[28rem] grid grid-cols-4 gap-3 my-5 mx-16"
      >
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
          <Image
            src={foot_3}
            className="w-5/6 self-center"
            alt="footer bg picture"
          />
        </div>
        <div className="h-5/6 w-full bg-white rounded-2xl overflow-hidden self-end shadow-lg">
          <Image
            src={foot_2}
            className="object-cover w-full h-full"
            alt="footer dog picture 2"
          />
        </div>
      </motion.div>
      {/** contact us section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.5 } }}
        id="Contact"
        className="h-96 bg-primary/20 mt-5 py-10 px-32 grid grid-cols-2"
      >
        <div className="col-span-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-bold">Call us</div>
            <div className="text-sm text-muted-foreground">
              Call our team Mon-Fri from 8am to 6pm.
            </div>
            <div className="flex gap-2 items-center mt-1">
              <BiPhoneCall size={20} />
              <span className="text-sm font-semibold">+212 663-486277</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">Check our work</div>
            <div className="text-sm text-muted-foreground">
              Check our work & chat with our friendly team.
            </div>
            <div className="flex gap-2 items-center mt-1">
              <Link href="https://www.linkedin.com/in/ahmad-ouladaouid/">
                <BiLogoLinkedin size={26} />
              </Link>
              <Link href="https://github.com/ahmadoa">
                <BiLogoGithub size={26} />
              </Link>
              <Link href="https://www.instagram.com/ahmad_oulada">
                <BiLogoInstagram size={26} />
              </Link>
              <Link href="https://mail.google.com/mail/?view=cm&source=mailto&to=ouladaouida@gmail.com">
                <BiLogoGmail size={26} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">Visit us</div>
            <div className="text-sm text-muted-foreground">
              Chat to us in person at our HQ.
            </div>
            <div className="flex gap-2 items-center mt-1">
              <BiSolidMap size={24} />
              <span className="text-sm font-semibold">
                106 Medina, Tangier Morocco 90000
              </span>
            </div>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="col-span-1 w-full h-full   grid grid-cols-2 grid-rows-4 gap-4"
        >
          <div className="row-span-1 col-span-2  h-full grid grid-cols-2 gap-7">
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="firstname" className="font-semibold text-sm">
                Firstname
              </label>
              <input
                name="firstname"
                placeholder="First name"
                className="w-full h-full pl-2 outline outline-1 outline-muted-foreground rounded-xl bg-transparent placeholder:text-muted-foreground"
                {...register("firstname", { required: true })}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="lastname" className="font-semibold text-sm">
                Lastname
              </label>
              <input
                name="lastname"
                placeholder="Last name"
                className="w-full h-full pl-2 outline outline-1 outline-muted-foreground rounded-xl bg-transparent placeholder:text-muted-foreground"
                {...register("lastname", { required: true })}
              />
            </div>
          </div>
          <div className="row-span-1 col-span-2 h-full flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-sm">
              Email
            </label>
            <input
              name="email"
              placeholder="username@domain.com"
              className="w-full h-full pl-2 outline outline-1 outline-muted-foreground rounded-xl bg-transparent placeholder:text-muted-foreground"
              {...register("email", { required: true })}
            />
          </div>
          <div className="row-span-1 col-span-2 h-full flex flex-col gap-1">
            <label htmlFor="message" className="font-semibold text-sm">
              Message
            </label>
            <input
              name="message"
              placeholder="Leave us a message..."
              className="w-full h-full pl-2 outline outline-1 outline-muted-foreground rounded-xl bg-transparent placeholder:text-muted-foreground"
              {...register("message", { required: true })}
            />
          </div>
          <div className="row-span-1 col-span-2 flex items-end justify-end">
            <Button>Send message</Button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}
