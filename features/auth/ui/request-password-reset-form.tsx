"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { showErrorToast } from "@/features/shared/ui/show-error";
import { useActionState, startTransition, useEffect } from "react";
import { requestPasswordResetAction } from "../actions";
import { SubmitButton } from "./submit-button";

const resetPasswordVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: {
    opacity: 0,
    y: -10,
  },
};

const initialFormState = {
  error: false,
  message: "",
};

export const RequestPasswordResetForm = ({
  setStep,
}: {
  setStep: React.Dispatch<
    React.SetStateAction<"request-reset" | "check-email">
  >;
}) => {
  const [state, formAction] = useActionState(
    requestPasswordResetAction,
    initialFormState,
  );

  useEffect(() => {
    const hasFieldErrors = state.errors && Object.keys(state.errors).length > 0;

    if (state.error && state.message && !hasFieldErrors) {
      showErrorToast({ errorDetail: state.message });
    }

    if (!state.error && state.message != "") {
      setStep("check-email");
    }
  }, [state, setStep]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents automatic form reset
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  };

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
        <form onSubmit={handleSubmit} className="space-y-2 w-full">
          <Input placeholder="Enter your email address" name="email" />

          <SubmitButton className="w-full text-base">
            Send reset link
          </SubmitButton>
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
