import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";

const confirmEmailVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

export const ConfirmYourEmailComponent = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<"sign-up" | "confirm-email">>;
}) => {
  return (
    <motion.div
      transition={{
        duration: 0.4,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={confirmEmailVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="space-y-2"
    >
      <div className="space-y-2">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          Please confirm your email
        </h1>
      </div>

      <div className="max-w-80 w-full space-y-8">
        <div>
          <p className="text-muted-foreground text-center">
            We have a sent a magic link to your inbox.{" "}
          </p>
          <p className="text-muted-foreground text-center">
            Please check your inbox at
          </p>
          <p className="text-center">{"chinemeremnwaegerue@gmail.com"}</p>
        </div>{" "}
        <div className="space-y-2">
          <Button size="lg" className={"w-full border border-zinc-200"}>
            Check your inbox
          </Button>
          <Button
            className="w-full text-foreground cursor-pointer"
            variant={"link"}
            onClick={() => setStep("sign-up")}
          >
            Back to sign up
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
