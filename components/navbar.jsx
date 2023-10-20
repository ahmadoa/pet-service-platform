import Image from "next/image";
import Logo from "@/public/logo.svg";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="h-11 flex mx-7 justify-between items-center">
      <Image src={Logo} className="rotate-[30deg] w-8" />
      <div className="flex gap-5">
        <button className="text-sm font-medium">Sign up</button>
        <Button className="font-semibold">Log In</Button>
      </div>
    </div>
  );
}
