"use client";
import { motion } from "framer-motion";
import NotFound from "@/components/ui/not-found";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-under-nav col-span-12 flex flex-col items-center justify-center"
    >
      <NotFound />
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="text-lg font-bold text-center">
          Lost in the Digital Wilderness
        </div>
        <p className="w-4/6 text-sm text-muted-foreground text-center">
          Oops! It seems like you've wandered into uncharted territory. The page
          you're looking for might have taken a detour. No worries
        </p>
        <div className="flex items-center gap-5">
          <Button
            className="font-semibold"
            onClick={() => {
              router.push("/");
            }}
          >
            Go To Homepage
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
