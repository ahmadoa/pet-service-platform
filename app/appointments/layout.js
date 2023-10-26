import Logo from "@/public/logo.svg";
import Image from "next/image";

export default function layout({ children }) {
  return (
    <div className="w-full h-under-nav pl-7 py-5 relative overflow-hidden">
      <Image
        src={Logo}
        className="absolute -z-50 w-96 rotate-45 left-5 bottom-5 opacity-20 scale-150"
        alt="Logo decoration"
        priority
      />
      <Image
        src={Logo}
        className="absolute -z-50 w-72 -rotate-45 -right-10 top-5 opacity-20 "
        alt="Logo decoration 2"
        priority
      />
      {children}
    </div>
  );
}
