"use client";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Image from "next/image";

export const EmblaCarousel = ({ Team }) => {
  const [emblaRef] = useEmblaCarousel(
    { loop: false, skipSnaps: false, align: "start" },
    [WheelGesturesPlugin()]
  );

  console.log(Team);

  return (
    <div className="w-fit overflow-hidden" ref={emblaRef}>
      <div className="h-full w-full flex gap-5 touch-pan-y cursor-pointer">
        {Team.map((member) => {
          return (
            <div className="h-full flex flex-col gap-1 slide" key={member.id}>
              <div className="h-[80%] rounded-lg overflow-hidden">
                <Image
                  src={member.profile}
                  className="h-full w-full object-cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  alt={member.name}
                />
              </div>
              <div className="flex flex-col leading-snug">
                <div className="font-semibold capitalize">{member.name}</div>
                <div className="text-secondary-foreground/50 text-sm lowercase">
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
