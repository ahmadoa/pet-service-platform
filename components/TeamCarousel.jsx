"use client";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";

export const EmblaCarousel = ({ Team }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: false, skipSnaps: false, align: "start" },
    [WheelGesturesPlugin()]
  );

  return (
    <div className="w-fit overflow-hidden" ref={emblaRef}>
      <div className="h-full w-full flex gap-5 touch-pan-y">
        {Team.map((member) => {
          return (
            <div className="h-full flex flex-col gap-1 slide" key={member.name}>
              <div className="h-[80%]  rounded-lg overflow-hidden">
                <Image
                  src={member.image}
                  className="w-full h-full object-cover"
                  alt={member.name}
                />
              </div>
              <div className="flex flex-col leading-snug">
                <div className="font-semibold">{member.name}</div>
                <div className="text-secondary-foreground/50 text-sm">
                  {member.profession}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
