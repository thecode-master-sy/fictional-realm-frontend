"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

const resetPasswordVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

export const ResetPasswordComponent = () => {
  return (
    <motion.div
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={resetPasswordVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full flex flex-col items-center justify-center space-y-8"
    >
      <div className="space-y-1">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          Reset password
        </h1>
        <p className="text-muted-foreground text-center">
          We would email a link to your inbox.
        </p>
      </div>

      <div className="max-w-108 w-full">
        <form className="space-y-2 w-full">
          <Input placeholder="Enter your email address" name="email" />

          <Button
            size="lg"
            className={"w-full border border-zinc-200 text-base"}
          >
            Send reset link
          </Button>
          <Button
            className="w-full text-foreground cursor-pointer text-base"
            variant={"link"}
            size={"lg"}
          >
            <Link href={"/login"}>Back to sign in</Link>
          </Button>
        </form>
      </div>
    </motion.div>
  );
};
