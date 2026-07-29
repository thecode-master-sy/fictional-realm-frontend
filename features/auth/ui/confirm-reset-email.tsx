import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

const confirmEmailVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

export const ConfirmResetPasswordEmail = ({
  setStep,
}: {
  setStep: React.Dispatch<
    React.SetStateAction<"request-reset" | "check-email">
  >;
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
      className="space-y-2 flex flex-col w-full justify-center items-center"
    >
      <div className="space-y-2">
        <h1 className="text-[24px] font-bold text-foreground tracking-[-1px] text-center">
          Password reset email sent{" "}
        </h1>
      </div>

      <div className="max-w-108 w-full space-y-8">
        <div>
          <p className="text-muted-foreground text-center">
            We have a sent a link to your inbox.{" "}
          </p>
          <p className="text-muted-foreground text-center">
            Please check your inbox at
          </p>
          <p className="text-center">{"chinemeremnwaegerue@gmail.com"}</p>
        </div>{" "}
        <div className="space-y-2">
          <Button
            size="lg"
            className={"w-full border border-zinc-200  text-base"}
          >
            <a
              href="https://mail.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full h-full justify-center"
            >
              <Mail className="mr-2 h-4 w-4" />
              Check your inbox
            </a>
          </Button>
          <Button
            className="w-full text-foreground cursor-pointer text-base"
            variant={"link"}
            onClick={() => setStep("request-reset")}
          >
            Go back
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
